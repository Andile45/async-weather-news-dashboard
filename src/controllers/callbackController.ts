/**
 * Callback Controller Module
 *
 * Demonstrates the traditional callback pattern for asynchronous programming.
 * In this approach, functions accept error-first callbacks as their last argument.
 * Each subsequent async operation must be nested inside the previous callback,
 * which can lead to deeply nested code known as "callback hell."
 *
 * Flow: Fetch Weather → (nested) Fetch News → (nested) Fetch Weather Again
 *
 * This controller coordinates the Model (data fetching) and View (display)
 * layers, acting as the glue between them.
 */

import { getWeatherCallback } from "../models/weatherModel";
import { getNewsCallback } from "../models/newsModel";
import {
    displayHeader,
    displayWeather,
    displayNews,
    displayFooter,
    displayError,
} from "../views/dashboardView";
import { WeatherResponse, NewsApiResponse } from "../types/interfaces";

/** Identifier for this controller version, used in display headers/footers */
const VERSION = "Callback";

// Display the dashboard header to indicate which version is running
displayHeader(VERSION);

/**
 * Step 1: Fetch weather data using a callback.
 * The callback function receives an error (if any) and the weather data.
 * All subsequent operations must be nested inside this callback because
 * they depend on knowing the first operation completed.
 */
getWeatherCallback(
    undefined, // Use default latitude (Pretoria)
    undefined, // Use default longitude (Pretoria)
    (err: Error | null, weatherData?: WeatherResponse) => {
        if (err) {
            displayError("Weather Fetch", err);
            return; // Stop execution if weather fetch fails
        }

        // Pass weather data to the View for formatted display
        displayWeather(weatherData!, "Callback");

        /**
         * Step 2: Fetch news data — nested inside the weather callback.
         * This nesting is required because we must wait for the previous
         * operation to finish before starting the next one. This is the
         * fundamental limitation of the callback pattern.
         */
        getNewsCallback(
            "us",  // Country code for United States
            5,     // Fetch 5 articles
            (err2: Error | null, newsData?: NewsApiResponse) => {
                if (err2) {
                    displayError("News Fetch", err2);
                    return;
                }

                // Extract articles array from the API response (default to empty array)
                const articles = newsData?.articles ?? [];

                // Pass articles to the View for formatted display
                displayNews(articles, "Callback");

                /**
                 * Step 3: Fetch weather data a second time.
                 * This third level of nesting demonstrates "callback hell" —
                 * the code becomes increasingly indented and harder to read
                 * with each additional async operation. This is the primary
                 * motivation for using Promises or async/await instead.
                 */
                getWeatherCallback(
                    undefined,
                    undefined,
                    (err3: Error | null, weather2?: WeatherResponse) => {
                        if (err3) {
                            displayError("Second Weather Fetch", err3);
                            return;
                        }

                        // Display results from the second weather fetch
                        displayWeather(weather2!, "Callback - Second Fetch");

                        // Display the completion footer
                        displayFooter(VERSION);
                    }
                );
            }
        );
    }
);
