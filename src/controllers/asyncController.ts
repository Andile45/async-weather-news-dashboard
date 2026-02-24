/**
 * Async/Await Controller Module
 *
 * Demonstrates the modern async/await pattern for asynchronous programming.
 * This is syntactic sugar over Promises, making asynchronous code look and
 * behave like synchronous code. It provides the cleanest, most readable
 * approach to handling async operations in JavaScript/TypeScript.
 *
 * Features demonstrated:
 * - await with Promise.all() for efficient parallel fetching
 * - Sequential await for dependent operations
 * - try/catch/finally for structured error handling
 * - Nested try/catch for granular error recovery
 *
 * The controller coordinates the Model and View layers using async/await.
 */

import { getWeatherPromise } from "../models/weatherModel";
import { getNewsPromise } from "../models/newsModel";
import {
    displayHeader,
    displayWeather,
    displayNews,
    displayFooter,
    displayError,
} from "../views/dashboardView";
import { WeatherResponse, NewsApiResponse } from "../types/interfaces";

/** Identifier for this controller version */
const VERSION = "Async/Await";

/**
 * Main async function that orchestrates the entire dashboard flow.
 *
 * Using async/await, this function reads top-to-bottom like synchronous
 * code while actually performing asynchronous HTTP requests behind the
 * scenes. The 'await' keyword pauses execution until a Promise resolves,
 * without blocking the event loop.
 *
 * Error handling uses standard try/catch/finally blocks — the same
 * pattern used for synchronous error handling, making it intuitive.
 */
async function run(): Promise<void> {
    // Display the dashboard header
    displayHeader(VERSION);

    try {
        /**
         * Parallel fetch: Weather and News are fetched simultaneously.
         *
         * Promise.all() accepts an array of Promises and returns a new Promise
         * that resolves when ALL input promises resolve. Combined with 'await',
         * the code pauses here until both requests complete, then destructures
         * the results into separate variables.
         *
         * This is more efficient than sequential awaiting because both HTTP
         * requests are sent at the same time, reducing total wait time.
         */
        const [weatherData, newsData]: [WeatherResponse, NewsApiResponse] =
            await Promise.all([
                getWeatherPromise(),
                getNewsPromise("us", 5),
            ]);

        // Display weather information via the View layer
        displayWeather(weatherData, "Async/Await");

        // Extract and display news headlines from the response
        const articles = newsData?.articles ?? [];
        displayNews(articles, "Async/Await");

        /**
         * Nested try/catch: Demonstrates granular error handling.
         *
         * This inner try/catch isolates errors from the additional weather
         * fetch. If this secondary request fails, the error is caught and
         * logged without affecting the results already displayed above.
         *
         * This pattern is useful when you have optional or supplementary
         * operations that should not crash the entire application if they fail.
         */
        try {
            const additionalWeather: WeatherResponse = await getWeatherPromise();
            displayWeather(additionalWeather, "Async/Await - Additional Fetch");
        } catch (innerErr) {
            // Handle the inner error gracefully without propagating it
            displayError("Additional Weather Fetch", innerErr as Error);
        }
    } catch (err) {
        // Top-level error handler: catches any unhandled errors from the try block
        displayError("Async/Await Run", err as Error);
    } finally {
        /**
         * The finally block ALWAYS executes, regardless of whether the
         * try block succeeded or the catch block handled an error.
         * This is the ideal place for cleanup tasks or completion logging.
         */
        displayFooter(VERSION);
    }
}

// Invoke the main async function to start the dashboard
run();
