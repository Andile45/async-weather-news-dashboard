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

console.log("=== Promise Version ===");

httpsGetJsonPromise(weatherUrl)
  .then((weatherData: WeatherResponse) => {
    console.log("Weather (promise) temperature:", weatherData?.current_weather?.temperature);
    return httpsGetJsonPromise(newsUrl);
  })
  .then((newsData) => {
    const posts: NewsItem[] = newsData?.posts ?? [];
    console.log("News (promise) top headlines:");
    posts.slice(0, 5).forEach((p, i) => console.log(`${i + 1}. ${p.title}`));
    return Promise.resolve("done sequential");
  })
  .then((msg) => {
    console.log("Sequential chain complete:", msg);
  })
  .catch((err) => {
    console.error("Error in promise chain:", err.message);
  });

Promise.all([httpsGetJsonPromise(weatherUrl), httpsGetJsonPromise(newsUrl)])
  .then(([w, n]) => {
    console.log("--- Promise.all results ---");
    console.log("Weather temp (all):", w?.current_weather?.temperature);
    console.log("News count (all):", (n?.posts ?? []).length);
  })
  .catch((err) => console.error("Promise.all error:", err.message));

Promise.race([httpsGetJsonPromise(weatherUrl), httpsGetJsonPromise(newsUrl)])
  .then((first) => {
    console.log("--- Promise.race winner (first resolved) ---");
    if (first?.current_weather) {
      console.log("Winner is weather. Temp:", first.current_weather.temperature);
    } else if (first?.posts) {
      console.log("Winner is news. First headline:", first.posts[0]?.title);
    } else {
      console.log("Race winner:", first);
    }
  })
  .catch((err) => console.error("Promise.race error:", err.message));
