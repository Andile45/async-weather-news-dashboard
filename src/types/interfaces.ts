/**
 * TypeScript Interfaces Module
 *
 * Defines the data structures (types) used throughout the application
 * for type safety and improved developer experience. These interfaces
 * model the shape of data returned by external APIs.
 */

/**
 * Represents current weather conditions from the Open-Meteo API.
 * Contains real-time meteorological measurements.
 */
export interface CurrentWeather {
    temperature: number;    // Temperature in Celsius
    windspeed: number;      // Wind speed in km/h
    weathercode: number;    // WMO weather interpretation code
    time: string;           // ISO 8601 timestamp of the observation
}

/**
 * Represents the full response from the Open-Meteo Weather API.
 * The API returns the requested location's coordinates along
 * with the current weather conditions.
 */
export interface WeatherResponse {
    current_weather?: CurrentWeather;
    latitude?: number;
    longitude?: number;
    [key: string]: any;     // Allow additional fields from the API
}

/**
 * Represents a single news article from the NewsAPI.org response.
 * Each article includes metadata such as title, author, and source.
 */
export interface NewsArticle {
    source?: {
        id: string | null;
        name: string;
    };
    author?: string | null;
    title: string;
    description?: string | null;
    url?: string;
    urlToImage?: string | null;
    publishedAt?: string;
    content?: string | null;
}

/**
 * Represents the full response from the NewsAPI.org top-headlines endpoint.
 * Contains a status indicator, total result count, and the articles array.
 */
export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}
