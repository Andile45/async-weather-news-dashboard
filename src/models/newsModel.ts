/**
 * News Model Module
 *
 * Handles all data operations related to news articles.
 * This is part of the Model layer in the MVC architecture,
 * responsible for fetching and returning news data from
 * the NewsAPI.org API.
 *
 * The API key is sent via the "X-Api-Key" HTTP header, which is
 * the recommended authentication method for server-side requests
 * to NewsAPI.org (as opposed to passing it as a URL query parameter).
 *
 * Provides both callback and promise-based methods so that
 * all three controller styles can use the same data layer.
 */

import { NewsApiResponse } from "../types/interfaces";
import { buildNewsUrl, NEWS_API } from "../config/apiConfig";
import { httpGetJson, httpGetJsonPromise } from "../utils/httpClient";

/**
 * Builds the request headers required by the NewsAPI.org API.
 * The "X-Api-Key" header is the recommended way to authenticate
 * server-side (Node.js) requests to NewsAPI.org.
 *
 * @returns Headers object with the API key
 */
function getNewsHeaders(): Record<string, string> {
    return {
        "X-Api-Key": NEWS_API.apiKey,
    };
}

/**
 * Fetches top news headlines using the callback pattern.
 * Uses the NewsAPI.org top-headlines endpoint to retrieve
 * real-world news articles for the specified country.
 *
 * @param country  - Two-letter ISO country code (default: "us" for United States)
 * @param pageSize - Number of articles to fetch (default: 5)
 * @param callback - Error-first callback receiving (err, NewsApiResponse)
 */
export function getNewsCallback(
    country: string = "us",
    pageSize: number = 5,
    callback: (err: Error | null, data?: NewsApiResponse) => void
): void {
    // Build the API URL with country and page size parameters
    const url = buildNewsUrl(country, pageSize);

    // Pass API key via X-Api-Key header for server-side authentication
    httpGetJson(url, { headers: getNewsHeaders() }, callback);
}

/**
 * Fetches top news headlines using the promise pattern.
 * Returns a Promise that resolves with the parsed news data,
 * suitable for use with .then() chains or async/await.
 *
 * @param country  - Two-letter ISO country code (default: "us" for United States)
 * @param pageSize - Number of articles to fetch (default: 5)
 * @returns Promise resolving to a NewsApiResponse object
 */
export function getNewsPromise(
    country: string = "us",
    pageSize: number = 5
): Promise<NewsApiResponse> {
    // Build the API URL with country and page size parameters
    const url = buildNewsUrl(country, pageSize);

    // Pass API key via X-Api-Key header for server-side authentication
    return httpGetJsonPromise(url, { headers: getNewsHeaders() });
}
