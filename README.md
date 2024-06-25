# Currency Pair Char

You can checkout the live [demo](https://currency-pair-chart-v2.surge.sh/)

## 🎯 Existing Functionality
- Represents bars, displays the price scale, and dates.
- Shows axes with prices and dates.
- Visualizes trading volumes underneath each bar.
- Allows zooming in and out and scrolling through the chart.
- Enables selection of a currency pair.
- Displays grid-lines across the chart.
- Provides a tooltip with real-time OHLC data.
- Outputs messages from buttons to the console.

## 🚀 Quickstart

To get started, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/sumasamurai/currency-pair-chart.git
cd currency-pair-chart
npm install
```

2. You can build the project by running:

```
npm run build
```

3. Start your app:

```
npm start
```

Visit your app on: `http://localhost:3000`

4. Start development build:

```
npm run dev
```

Visit your app on: `http://localhost:9000`


## 📂 Structure
```
currency-pair-chart/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── views/
│   ├── types/
│   └──index.ts
│ 
├── public/
│   ├── data/
│   │   ├── EURUSD.json
│   │   └── USDJPY.json
│   ├── dist/
│   │   └── bundle.js
│   ├── style.css
│   ├── index.html
│   └── screenshot.png 
│ 
├── webpack.config.js
├── package.json
├── server.mjs
└── README.md
```