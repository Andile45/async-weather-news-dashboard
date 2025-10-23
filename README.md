📅 Project Overview

This project is designed to illustrate how asynchronous programming works in Node.js by using:

Callbacks (traditional style)

Promises (chained structure)

Async/Await (modern and cleaner syntax)

Each version of the app performs the same task:

Fetches weather data from the Open-Meteo API
.

Fetches news headlines from the DummyJSON Posts API
.

Displays results in the console.

🧠 Learning Objectives

Understand how the event loop and asynchronous tasks work in Node.js.

Practice using callbacks, promises, and async/await.

Learn how to handle errors gracefully.

Demonstrate Promise.all() and Promise.race() in practical use cases.

🧩 Project Structure
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

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/async-weather-news-dashboard.git
cd async-weather-news-dashboard

2. Install Dependencies
npm install

3. Compile TypeScript
npx tsc

🚀 Running the Project

Each version has its own NPM script:

Callback Version
npm run callback

Promise Version
npm run promise

Async/Await Version
npm run async
