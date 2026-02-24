/**
 * HTTP Client Utility Module
 *
 * Provides reusable helper functions for making HTTPS GET requests
 * and parsing JSON responses. Supports both callback and promise-based
 * patterns so that the Model layer can serve all three controller styles
 * (callback, promise, async/await) without duplicating HTTP logic.
 *
 * Supports optional custom headers (e.g., for API key authentication).
 * Uses Node.js built-in 'https' module — no external dependencies needed.
 */

import https from "https";
import { URL } from "url";

/**
 * Options for customizing HTTP requests.
 * Allows callers to pass additional headers (e.g., API keys).
 */
export interface HttpRequestOptions {
    headers?: Record<string, string>;
}

/**
 * Makes an HTTPS GET request and parses the JSON response using a callback pattern.
 *
 * This function streams the response data in chunks, concatenates them,
 * and then parses the final result as JSON. It follows the Node.js
 * error-first callback convention: callback(error, data).
 *
 * @param url      - The full URL to fetch data from
 * @param options  - Optional request options (e.g., custom headers)
 * @param callback - Error-first callback function receiving (err, parsedData)
 */
export function httpGetJson(
    url: string,
    options: HttpRequestOptions | ((err: Error | null, data?: any) => void),
    callback?: (err: Error | null, data?: any) => void
): void {
    // Support both (url, callback) and (url, options, callback) signatures
    let requestOptions: HttpRequestOptions = {};
    let cb: (err: Error | null, data?: any) => void;

    if (typeof options === "function") {
        // Called as httpGetJson(url, callback) — no custom options
        cb = options;
    } else {
        // Called as httpGetJson(url, options, callback) — with custom options
        requestOptions = options;
        cb = callback!;
    }

    // Parse the URL to extract hostname, path, and query parameters
    const parsedUrl = new URL(url);

    // Build the request options object with URL components and any custom headers
    const reqOptions: https.RequestOptions = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        method: "GET",
        headers: {
            "User-Agent": "AsyncWeatherNewsDashboard/1.0",
            ...requestOptions.headers, // Merge in any custom headers (e.g., API keys)
        },
    };

    https
        .get(reqOptions, (res) => {
            const { statusCode } = res;

            // Check for HTTP error status codes (4xx client errors, 5xx server errors)
            if (statusCode && statusCode >= 400) {
                // Read the error response body for more details
                let errorBody = "";
                res.setEncoding("utf8");
                res.on("data", (chunk: string) => (errorBody += chunk));
                res.on("end", () => {
                    cb(new Error(`HTTP request failed with status ${statusCode}: ${errorBody}`));
                });
                return;
            }

            let rawData = "";
            res.setEncoding("utf8");

            // Accumulate response data as it streams in chunk by chunk
            res.on("data", (chunk: string) => (rawData += chunk));

            // Parse the complete JSON response once all chunks have been received
            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    cb(null, parsedData);
                } catch (parseError) {
                    // JSON parsing failed — return the parse error via callback
                    cb(parseError as Error);
                }
            });
        })
        .on("error", (networkError) => {
            // Network-level error (DNS failure, connection refused, etc.)
            cb(networkError);
        });
}

/**
 * Makes an HTTPS GET request and returns a Promise that resolves with parsed JSON.
 *
 * This is the promise-based counterpart of httpGetJson(). It wraps the same
 * streaming HTTPS logic in a Promise, making it compatible with both
 * .then() chains and async/await syntax.
 *
 * @param url     - The full URL to fetch data from
 * @param options - Optional request options (e.g., custom headers)
 * @returns A Promise that resolves with the parsed JSON data, or rejects with an Error
 */
export function httpGetJsonPromise(
    url: string,
    options: HttpRequestOptions = {}
): Promise<any> {
    return new Promise((resolve, reject) => {
        // Parse the URL to extract hostname, path, and query parameters
        const parsedUrl = new URL(url);

        // Build request options with URL components and custom headers
        const reqOptions: https.RequestOptions = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: "GET",
            headers: {
                "User-Agent": "AsyncWeatherNewsDashboard/1.0",
                ...options.headers, // Merge in any custom headers
            },
        };

        https
            .get(reqOptions, (res) => {
                const { statusCode } = res;

                // Reject the promise for HTTP error responses
                if (statusCode && statusCode >= 400) {
                    let errorBody = "";
                    res.setEncoding("utf8");
                    res.on("data", (chunk: string) => (errorBody += chunk));
                    res.on("end", () => {
                        reject(new Error(`HTTP request failed with status ${statusCode}: ${errorBody}`));
                    });
                    return;
                }

                let rawData = "";
                res.setEncoding("utf8");

                // Collect streaming response data into a single string
                res.on("data", (chunk: string) => (rawData += chunk));

                // Resolve with the parsed JSON when the response is fully received
                res.on("end", () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (parseError) {
                        reject(parseError);
                    }
                });
            })
            .on("error", (networkError) => {
                // Reject on network-level errors
                reject(networkError);
            });
    });
}
