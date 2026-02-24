/**
 * Promise Controller Module
 *
 * Demonstrates the Promise pattern for asynchronous programming.
 * Promises provide a significant improvement over callbacks by enabling
 * flat .then() chains instead of deeply nested code, and centralized
 * error handling via .catch().
 *
 * This module showcases three important Promise features:
 * 1. Sequential chaining with .then() — operations run one after another
 * 2. Parallel execution with Promise.all() — operations run simultaneously
 * 3. Racing with Promise.race() — first response wins
 *
 * The controller coordinates the Model and View layers using Promises.
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
const VERSION = "Promise";

// Display the dashboard header
displayHeader(VERSION);

/**
 * ──────────────────────────────────────────────
 * 1. SEQUENTIAL PROMISE CHAIN
 * ──────────────────────────────────────────────
 *
 * Demonstrates .then() chaining where each operation waits for the
 * previous one to complete before starting. Unlike nested callbacks,
 * the code stays flat and readable. Each .then() receives the return
 * value of the previous .then() handler.
 */
getWeatherPromise()
    .then((weatherData: WeatherResponse) => {
        // Display weather data returned by the Model
        displayWeather(weatherData, "Promise - Sequential");

        // Return the next Promise to continue the chain
        return getNewsPromise("us", 5);
    })
    .then((newsData: NewsApiResponse) => {
        // Extract and display news articles from the chained response
        const articles = newsData?.articles ?? [];
        displayNews(articles, "Promise - Sequential");
    })
    .then(() => {
        console.log("\n✅  Sequential promise chain complete.");
    })
    .catch((err: Error) => {
        // A single .catch() handles errors from ANY step in the chain.
        // If the weather fetch fails, the news fetch is skipped entirely.
        displayError("Sequential Chain", err);
    });

/**
 * ──────────────────────────────────────────────
 * 2. PROMISE.ALL() — Parallel Execution
 * ──────────────────────────────────────────────
 *
 * Fetches weather and news data simultaneously. Promise.all() takes
 * an array of Promises and waits for ALL of them to resolve. The results
 * are returned in the same order as the input array.
 *
 * This is more efficient than sequential fetching because both HTTP
 * requests are in flight at the same time, reducing total wait time.
 *
 * If ANY promise rejects, the entire Promise.all() rejects immediately.
 */
Promise.all([getWeatherPromise(), getNewsPromise("us", 5)])
    .then(([weatherData, newsData]: [WeatherResponse, NewsApiResponse]) => {
        console.log("\n--- Promise.all() Results (Parallel Fetch) ---");

        // Display weather data from the parallel fetch
        displayWeather(weatherData, "Promise.all");

        // Display news articles from the parallel fetch
        const articles = newsData?.articles ?? [];
        displayNews(articles, "Promise.all");
    })
    .catch((err: Error) => {
        // If either the weather OR news request fails, this handler runs
        displayError("Promise.all", err);
    });

/**
 * ──────────────────────────────────────────────
 * 3. PROMISE.RACE() — First Response Wins
 * ──────────────────────────────────────────────
 *
 * Fetches weather and news simultaneously, but resolves with whichever
 * request finishes FIRST. The other request's result is discarded.
 *
 * Practical use cases include:
 * - Implementing request timeouts
 * - Choosing the fastest data source from multiple mirrors
 */
Promise.race([getWeatherPromise(), getNewsPromise("us", 5)])
    .then((firstResult: any) => {
        console.log("\n--- Promise.race() Winner (First Response) ---");

        // Determine which API responded first by inspecting the response shape
        if (firstResult?.current_weather) {
            console.log("🏆  Weather API responded first!");
            displayWeather(firstResult, "Promise.race");
        } else if (firstResult?.articles) {
            console.log("🏆  News API responded first!");
            displayNews(firstResult.articles, "Promise.race");
        }
    })
    .catch((err: Error) => {
        // Triggered if the FIRST promise to settle is a rejection
        displayError("Promise.race", err);
    });
