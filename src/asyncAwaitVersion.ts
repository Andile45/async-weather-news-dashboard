import https from "https";
import { buildWeatherUrl, buildNewsUrl } from "./config";
import { WeatherResponse, NewsItem } from "./types";

function httpsGetJsonPromise(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const { statusCode } = res;
      if (statusCode && statusCode >= 400) {
        reject(new Error(`Request failed. Status code: ${statusCode}`));
        res.resume();
        return;
      }
      let raw = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(raw);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", (err) => reject(err));
  });
}

const userLat = -25.7479;
const userLon = 28.2293;

const weatherUrl = buildWeatherUrl(userLat, userLon);
const newsUrl = buildNewsUrl(5);

console.log("=== Async/Await Version ===");

async function run() {
  try {
    const [weatherData, newsData] = await Promise.all([
      httpsGetJsonPromise(weatherUrl),
      httpsGetJsonPromise(newsUrl)
    ]);

    console.log("Weather (async) temp:", weatherData?.current_weather?.temperature);

    const posts: NewsItem[] = newsData?.posts ?? [];
    console.log("News (async) top headlines:");
    posts.slice(0, 5).forEach((p, i) => console.log(`${i + 1}. ${p.title}`));

    try {
      const singleWeather = await httpsGetJsonPromise(weatherUrl);
      console.log("Single weather fetch (nested try):", singleWeather?.current_weather?.temperature);
    } catch (innerErr) {
      console.error("Inner weather fetch error:", (innerErr as Error).message);
    }
  } catch (err) {
    console.error("Async/Await run error:", (err as Error).message);
  } finally {
    console.log("=== Async/Await Version Done ===");
  }
}

run();
