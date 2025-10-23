# 🌦️ Async Weather & News Dashboard

A Node.js + TypeScript project demonstrating **asynchronous programming** in three different styles: **Callbacks**, **Promises**, and **Async/Await**.  
The app fetches **weather data** and **news headlines** from public APIs and showcases how asynchronous operations are handled in modern JavaScript.

---

## 📅 Project Overview

This project is designed to illustrate how asynchronous programming works in Node.js by using:
- Callbacks (traditional style)
- Promises (chained structure)
- Async/Await (modern and cleaner syntax)

Each version of the app performs the **same task**:
1. Fetches **weather data** from the [Open-Meteo API](https://open-meteo.com/).
2. Fetches **news headlines** from the [DummyJSON Posts API](https://dummyjson.com/).
3. Displays results in the console.

---

## 🧠 Learning Objectives

- Understand how the **event loop** and **asynchronous tasks** work in Node.js.
- Practice using **callbacks**, **promises**, and **async/await**.
- Learn how to handle **errors** gracefully.
- Demonstrate **Promise.all()** and **Promise.race()** in practical use cases.

---

## 🧩 Project Structure

```
async-weather-news-dashboard/
│
├── src/
│   ├── callbackVersion.ts       # Implementation using callbacks
│   ├── promiseVersion.ts        # Implementation using Promises
│   └── asyncAwaitVersion.ts     # Implementation using async/await
│
├── package.json                 # Project metadata and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
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

### 3. Compile TypeScript
```bash
npx tsc
```

---

## 🚀 Running the Project

Each version has its own NPM script:

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
🌦️ Weather in Pretoria: 22°C, clear sky
📰 Latest News Headlines:
1. Exploring the Future of Tech
2. New Discoveries in Space
3. Economic Trends of 2026
```

---

## 🧪 Promise Features Demonstration

| Feature | Description |
|----------|--------------|
| `Promise.all()` | Fetches both weather and news simultaneously |
| `Promise.race()` | Returns whichever (weather or news) responds first |
| `try...catch` | Handles async/await errors safely |
| `callback hell` | Demonstrated in the callback version for educational purposes |

---
