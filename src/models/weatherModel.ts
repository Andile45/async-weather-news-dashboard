/**
 * Weather Model Module
 *
 * Handles all data operations related to weather information.
 * This is part of the Model layer in the MVC architecture,
 * responsible for fetching and returning weather data from
 * the Open-Meteo API.
 *
 * Provides both callback and promise-based methods so that
 * all three controller styles can use the same data layer.
 */

import { WeatherResponse } from "../types/interfaces";
import { buildWeatherUrl, DEFAULT_LOCATION } from "../config/apiConfig";
import { httpGetJson, httpGetJsonPromise } from "../utils/httpClient";

/**
 * Fetches current weather data using the callback pattern.
 * Delegates URL construction to the config module and HTTP
 * fetching to the shared httpClient utility.
 *
 * @param latitude  - Geographic latitude (defaults to Pretoria)
 * @param longitude - Geographic longitude (defaults to Pretoria)
 * @param callback  - Error-first callback receiving (err, WeatherResponse)
 */
export function getWeatherCallback(
    latitude: number = DEFAULT_LOCATION.latitude,
    longitude: number = DEFAULT_LOCATION.longitude,
    callback: (err: Error | null, data?: WeatherResponse) => void
): void {
    // Build the API URL using configuration defaults
    const url = buildWeatherUrl(latitude, longitude);

    // Delegate the HTTP request to the shared utility
    httpGetJson(url, callback);
}

/**
 * Fetches current weather data using the promise pattern.
 * Returns a Promise that resolves with the parsed weather data,
 * suitable for use with .then() chains or async/await.
 *
 * @param latitude  - Geographic latitude (defaults to Pretoria)
 * @param longitude - Geographic longitude (defaults to Pretoria)
 * @returns Promise resolving to a WeatherResponse object
 */
export function getWeatherPromise(
    latitude: number = DEFAULT_LOCATION.latitude,
    longitude: number = DEFAULT_LOCATION.longitude
): Promise<WeatherResponse> {
    // Build the API URL using configuration defaults
    const url = buildWeatherUrl(latitude, longitude);

    // Return a promise from the shared HTTP utility
    return httpGetJsonPromise(url);
}
