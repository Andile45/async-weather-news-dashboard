import https from "https";
import { buildWeatherUrl, buildNewsUrl } from "./config";
import { WeatherResponse, NewsItem } from "./types";

function httpsGetJson(url: string, callback: (err: Error | null, data?: any) => void) {
  https.get(url, (res) => {
    const { statusCode } = res;
    if (statusCode && statusCode >= 400) {
      callback(new Error(`Request failed. Status code: ${statusCode}`));
      res.resume();
      return;
    }
    let raw = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => (raw += chunk));
    res.on("end", () => {
      try {
        const parsed = JSON.parse(raw);
        callback(null, parsed);
      } catch (err) {
        callback(err as Error);
      }
    });
  }).on("error", (err) => callback(err));
}

const userLat = -25.7479;
const userLon = 28.2293;

const weatherUrl = buildWeatherUrl(userLat, userLon);
const newsUrl = buildNewsUrl(5);

console.log("=== Callback Version ===");

httpsGetJson(weatherUrl, (err, weatherData: WeatherResponse) => {
  if (err) {
    console.error("Weather error (callback):", err.message);
    return;
  }
  console.log("Weather (callback) received, temperature:", weatherData?.current_weather?.temperature);

  httpsGetJson(newsUrl, (err2, newsData) => {
    if (err2) {
      console.error("News error (callback):", err2.message);
      return;
    }

    const posts: NewsItem[] = newsData?.posts ?? [];
    console.log("News (callback) received. Top headlines:");
    posts.slice(0, 5).forEach((p, i) => console.log(`${i + 1}. ${p.title}`));

    httpsGetJson(weatherUrl, (err3, weather2) => {
      if (err3) {
        console.error("Second weather fetch error (callback):", err3.message);
        return;
      }
      console.log("Second weather fetch done (callback). Temp:", weather2?.current_weather?.temperature);
      console.log("=== Callback Version Done ===");
    });
  });
});
