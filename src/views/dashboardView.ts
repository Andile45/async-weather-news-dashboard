/**
 * Dashboard View Module
 *
 * Handles all presentation logic for the console-based dashboard.
 * This is the View layer in the MVC architecture, responsible for
 * formatting and displaying data to the user. It has NO knowledge
 * of how data is fetched — it only knows how to display it.
 *
 * By separating display logic from data fetching, we can easily
 * change the presentation (e.g., switch to a web UI) without
 * modifying the Models or Controllers.
 */

import { WeatherResponse, NewsArticle } from "../types/interfaces";
import { DEFAULT_LOCATION } from "../config/apiConfig";

/**
 * Displays a formatted header banner for the dashboard.
 * Called once at the start of each version's execution.
 *
 * @param version - Name of the async pattern being demonstrated (e.g., "Callback")
 */
export function displayHeader(version: string): void {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`🌦️  Async Weather & News Dashboard`);
    console.log(`📋  Version: ${version}`);
    console.log(`${"=".repeat(50)}\n`);
}

/**
 * Displays formatted weather information from the API response.
 * Extracts temperature and wind speed from the current_weather object
 * and prints them alongside the configured city name.
 *
 * @param data  - The weather API response object
 * @param label - Optional label to identify which fetch produced this data
 */
export function displayWeather(data: WeatherResponse, label: string = ""): void {
    const prefix = label ? `[${label}] ` : "";
    const weather = data?.current_weather;

    // Check if the response contains valid weather data
    if (weather) {
        console.log(`${prefix}🌡️  Temperature in ${DEFAULT_LOCATION.city}: ${weather.temperature}°C`);
        console.log(`${prefix}💨  Wind Speed: ${weather.windspeed} km/h`);
    } else {
        console.log(`${prefix}⚠️  Weather data unavailable.`);
    }
}

/**
 * Displays formatted news headlines as a numbered list.
 * Each article's title is printed with a sequential number.
 *
 * @param articles - Array of NewsArticle objects to display
 * @param label    - Optional label to identify which fetch produced this data
 */
export function displayNews(articles: NewsArticle[], label: string = ""): void {
    const prefix = label ? `[${label}] ` : "";

    // Only display headlines if articles were returned
    if (articles.length > 0) {
        console.log(`\n${prefix}📰  Top News Headlines:`);
        articles.forEach((article, index) => {
            console.log(`   ${index + 1}. ${article.title}`);
        });
    } else {
        console.log(`${prefix}⚠️  No news articles available.`);
    }
}

/**
 * Displays a formatted footer indicating the version has completed.
 * Called once at the end of each version's execution.
 *
 * @param version - Name of the async pattern that was demonstrated
 */
export function displayFooter(version: string): void {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`✅  ${version} — Complete`);
    console.log(`${"=".repeat(50)}\n`);
}

/**
 * Displays a formatted error message for failed operations.
 * Uses console.error to write to stderr, keeping it separate
 * from normal output.
 *
 * @param context - Description of what operation failed
 * @param error   - The Error object containing the failure details
 */
export function displayError(context: string, error: Error): void {
    console.error(`❌  Error [${context}]: ${error.message}`);
}
