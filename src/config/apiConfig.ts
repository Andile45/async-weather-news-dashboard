/**
 * API Configuration Module
 *
 * Centralizes all API-related configuration including base URLs,
 * API keys, and URL builder functions. Having a single source of
 * truth for configuration makes it easy to update endpoints or
 * credentials without modifying multiple files.
 */

import { URL } from "url";

/**
 * NewsAPI.org API key for fetching real news headlines.
 * Get your free API key at: https://newsapi.org/register
 *
 * IMPORTANT: Replace "YOUR_NEWS_API_KEY_HERE" with your actual key.
 */
const NEWS_API_KEY: string = "2250199a202046ad9e055d2a81e84e6b";

/** Open-Meteo Weather API configuration (free, no API key required) */
export const WEATHER_API = {
    base: "https://api.open-meteo.com/v1/forecast",
};

/** NewsAPI.org configuration for fetching real-world news headlines */
export const NEWS_API = {
    base: "https://newsapi.org/v2",
    topHeadlinesPath: "/top-headlines",
    apiKey: NEWS_API_KEY,
};

/** Default geographic coordinates for Pretoria, South Africa */
export const DEFAULT_LOCATION = {
    latitude: -25.7479,
    longitude: 28.2293,
    city: "Pretoria",
};

/**
 * Builds the complete URL for the Open-Meteo weather API request.
 * The Open-Meteo API is free and does not require an API key.
 *
 * @param latitude  - Geographic latitude coordinate
 * @param longitude - Geographic longitude coordinate
 * @returns Fully constructed weather API URL string
 *
 * @example
 * buildWeatherUrl(-25.7479, 28.2293)
 * // => "https://api.open-meteo.com/v1/forecast?latitude=-25.7479&longitude=28.2293&current_weather=true"
 */
export function buildWeatherUrl(latitude: number, longitude: number): string {
    const url = new URL(WEATHER_API.base);
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("current_weather", "true");
    return url.toString();
}

/**
 * Builds the complete URL for the NewsAPI.org top headlines request.
 * Note: The API key is NOT included in the URL — it must be sent
 * as an "X-Api-Key" HTTP header for server-side (Node.js) requests.
 *
 * @param country  - Two-letter ISO 3166-1 country code (default: "za" for South Africa)
 * @param pageSize - Number of articles to retrieve per request (default: 5)
 * @returns Fully constructed news API URL string (without API key)
 *
 * @example
 * buildNewsUrl("za", 5)
 * // => "https://newsapi.org/v2/top-headlines?country=za&pageSize=5"
 */
export function buildNewsUrl(country: string = "za", pageSize: number = 5): string {
    const url = new URL(NEWS_API.base + NEWS_API.topHeadlinesPath);
    url.searchParams.set("country", country);
    url.searchParams.set("pageSize", String(pageSize));
    return url.toString();
}
