# 🌦️ Async Weather & News Dashboard

A Node.js + TypeScript project demonstrating **asynchronous programming** in three different styles: **Callbacks**, **Promises**, and **Async/Await**.  
The app fetches **weather data** from [Open-Meteo](https://open-meteo.com/) and **news headlines** from [NewsAPI.org](https://newsapi.org/) and showcases how asynchronous operations are handled in modern JavaScript.

---

## 📅 Project Overview

This project is designed to illustrate how asynchronous programming works in Node.js by using:
- Callbacks (traditional style)
- Promises (chained structure with `Promise.all()` and `Promise.race()`)
- Async/Await (modern and cleaner syntax)

Each version of the app performs the **same task**:
1. Fetches **weather data** from the [Open-Meteo API](https://open-meteo.com/).
2. Fetches **news headlines** from the [NewsAPI.org](https://newsapi.org/).
3. Displays results in the console.

---

## 🧠 Learning Objectives

- Understand how the **event loop** and **asynchronous tasks** work in Node.js.
- Practice using **callbacks**, **promises**, and **async/await**.
- Learn how to handle **errors** gracefully with each pattern.
- Demonstrate **Promise.all()** and **Promise.race()** in practical use cases.
- Apply the **MVC (Model-View-Controller)** architectural pattern in a Node.js application.

---

## 🏗️ Architecture — MVC Pattern

This project follows the **Model-View-Controller (MVC)** architectural pattern to ensure clean separation of concerns:

| Layer | Responsibility | Files |
|-------|---------------|-------|
| **Model** | Data fetching & API interaction | `models/weatherModel.ts`, `models/newsModel.ts` |
| **View** | Console display & formatting | `views/dashboardView.ts` |
| **Controller** | Orchestration & business logic | `controllers/callbackController.ts`, `controllers/promiseController.ts`, `controllers/asyncController.ts` |

Additional supporting modules:
- **Config** (`config/apiConfig.ts`) — Centralizes API URLs, keys, and URL builder functions.
- **Types** (`types/interfaces.ts`) — Defines TypeScript interfaces for API responses.
- **Utils** (`utils/httpClient.ts`) — Shared HTTP utility for making HTTPS requests.

---

## 🧩 Project Structure

```
async-weather-news-dashboard/
│
├── src/
│   ├── config/
│   │   └── apiConfig.ts              # API URLs, keys, and URL builder functions
│   │
│   ├── types/
│   │   └── interfaces.ts             # TypeScript interfaces for API responses
│   │
│   ├── utils/
│   │   └── httpClient.ts             # Shared HTTP GET utility (callback & promise)
│   │
│   ├── models/
│   │   ├── weatherModel.ts           # Weather data fetching (Model layer)
│   │   └── newsModel.ts              # News data fetching (Model layer)
│   │
│   ├── views/
│   │   └── dashboardView.ts          # Console display formatting (View layer)
│   │
│   └── controllers/
│       ├── callbackController.ts     # Callback-based orchestration (Controller)
│       ├── promiseController.ts      # Promise-based orchestration (Controller)
│       └── asyncController.ts        # Async/Await orchestration (Controller)
│
├── package.json                       # Project metadata and NPM scripts
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # Project documentation
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/async-weather-news-dashboard.git
cd async-weather-news-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure the News API Key
This project uses the [NewsAPI.org](https://newsapi.org/) to fetch real news headlines.

1. **Register** for a free API key at [https://newsapi.org/register](https://newsapi.org/register)
2. **Open** `src/config/apiConfig.ts`
3. **Replace** `"YOUR_NEWS_API_KEY_HERE"` with your actual API key:
```typescript
const NEWS_API_KEY: string = "your_actual_api_key_here";
```

### 4. Compile TypeScript (optional)
```bash
npm run build
```

---

## 🚀 Running the Project

Each async version has its own NPM script:

### Callback Version
```bash
npm run callback
```

### Promise Version
```bash
npm run promise
```

### Async/Await Version
```bash
npm run async
```

---

## 🌍 Example Output

**Async/Await Version Output**
```
==================================================
🌦️  Async Weather & News Dashboard
📋  Version: Async/Await
==================================================

[Async/Await] 🌡️  Temperature in Pretoria: 22°C
[Async/Await] 💨  Wind Speed: 8.3 km/h

[Async/Await] 📰  Top News Headlines:
   1. Breaking: New Economic Policy Announced
   2. Sports: Springboks Win Series
   3. Tech: AI Breakthrough in Healthcare
   4. Weather: Record Temperatures Expected
   5. Politics: Local Elections Update

[Async/Await - Additional Fetch] 🌡️  Temperature in Pretoria: 22°C
[Async/Await - Additional Fetch] 💨  Wind Speed: 8.3 km/h

==================================================
✅  Async/Await — Complete
==================================================
```

---

## 🧪 Async Features Demonstrated

| Feature | Description | File |
|---------|-------------|------|
| **Callbacks** | Traditional error-first callbacks with nested "callback hell" | `callbackController.ts` |
| **Promise.then()** | Sequential promise chaining with flat code structure | `promiseController.ts` |
| **Promise.all()** | Parallel execution — fetches weather and news simultaneously | `promiseController.ts` |
| **Promise.race()** | Returns whichever API responds first | `promiseController.ts` |
| **async/await** | Modern syntax making async code look synchronous | `asyncController.ts` |
| **try/catch/finally** | Structured error handling with guaranteed cleanup | `asyncController.ts` |
| **Nested try/catch** | Granular error recovery for optional operations | `asyncController.ts` |

---

## 📡 APIs Used

| API | Purpose | Auth Required |
|-----|---------|---------------|
| [Open-Meteo](https://open-meteo.com/) | Current weather data (temperature, wind speed) | ❌ No |
| [NewsAPI.org](https://newsapi.org/) | Top news headlines by country | ✅ Free API key |

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript (strict mode)
- **Architecture**: MVC (Model-View-Controller)
- **HTTP**: Node.js built-in `https` module (no external HTTP libraries)
- **Dev Tools**: ts-node, TypeScript compiler

---
