import { URL } from "url";

export const WEATHER_API = {
  base: "https://api.open-meteo.com/v1/forecast"
};

export const NEWS_API = {
  base: "https://dummyjson.com",
  postsPath: "/posts"
};

export function buildWeatherUrl(latitude: number, longitude: number) {
  const url = new URL(WEATHER_API.base);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("current_weather", "true");
  return url.toString();
}

export function buildNewsUrl(limit = 5) {
  const url = new URL(NEWS_API.base + NEWS_API.postsPath);
  url.searchParams.set("limit", String(limit));
  return url.toString();
}
