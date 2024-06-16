/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/CandleController.ts":
/*!*********************************************!*\
  !*** ./src/controllers/CandleController.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CandleController: () => (/* binding */ CandleController)\n/* harmony export */ });\nclass CandleController {\n    model;\n    view;\n    constructor(candleModel, candleView) {\n        this.model = candleModel;\n        this.view = candleView;\n    }\n    getModel() {\n        return this.model;\n    }\n    getView() {\n        return this.view;\n    }\n    drawCandles(data, startIndex, endIndex, minPrice, maxPrice) {\n        this.view.drawCandles(data, startIndex, endIndex, minPrice, maxPrice);\n    }\n}\n\n\n//# sourceURL=webpack://currency-pair-chart/./src/controllers/CandleController.ts?");

/***/ }),

/***/ "./src/controllers/ChartController.ts":
/*!********************************************!*\
  !*** ./src/controllers/ChartController.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChartController: () => (/* binding */ ChartController)\n/* harmony export */ });\nclass ChartController {\n    model;\n    view;\n    candleController;\n    isDragging;\n    dragStartX;\n    currency;\n    constructor(model, view, candleController) {\n        this.model = model;\n        this.view = view;\n        this.candleController = candleController;\n        this.isDragging = false;\n        this.dragStartX = 0;\n        this.currency = null;\n        this.bindEventListeners();\n    }\n    async initialize(currency) {\n        await this.model.loadData(currency);\n        this.draw();\n    }\n    draw() {\n        const ctx = this.view.getContext();\n        ctx.clearRect(0, 0, this.view.getCanvas().width, this.view.getCanvas().height);\n        const data = this.model.getData();\n        const minPrice = this.model.getMinPrice();\n        const maxPrice = this.model.getMaxPrice();\n        const startIndex = this.model.getStartIndex();\n        const endIndex = this.model.getEndIndex();\n        this.model.calculatePriceRange();\n        this.view.drawAxes();\n        this.view.drawGridLines(minPrice, maxPrice);\n        this.candleController.drawCandles(data, startIndex, endIndex, minPrice, maxPrice);\n        this.view.drawPriceScale(minPrice, maxPrice);\n        this.view.drawDateScale(data, startIndex, endIndex);\n        this.view.drawVolumes(data, startIndex, endIndex);\n    }\n    handleWheel(event) {\n        if (event.deltaY < 0) {\n            this.zoomIn(event);\n        }\n        else {\n            this.zoomOut(event);\n        }\n    }\n    zoomIn(event) {\n        const zoomIntensity = 0.1;\n        const currentScaleFactor = this.view.getScaleFactor();\n        const updatedScaleFactor = Math.max(1, currentScaleFactor * (1 + zoomIntensity));\n        this.view.setScaleFactor(updatedScaleFactor);\n        const mouseX = event.offsetX;\n        const zoomCenter = (mouseX - this.view.getPadding()) / this.view.getChartWidth();\n        const newRange = Math.max(1, Math.floor((this.model.getData().length - 1) / currentScaleFactor));\n        const centerIndex = this.model.getStartIndex() + Math.floor((this.model.getEndIndex() - this.model.getStartIndex()) * zoomCenter);\n        const newStartIndex = Math.max(0, centerIndex - Math.floor(newRange * zoomCenter));\n        const newEndIndex = Math.min(this.model.getData().length - 1, newStartIndex + newRange);\n        this.model.updateIndexRange(newStartIndex, newEndIndex);\n        this.draw();\n    }\n    zoomOut(event) {\n        const zoomIntensity = 0.1;\n        const currentScaleFactor = this.view.getScaleFactor();\n        const updatedScaleFactor = Math.max(1, currentScaleFactor * (1 - zoomIntensity));\n        this.view.setScaleFactor(updatedScaleFactor);\n        const mouseX = event.offsetX;\n        const zoomCenter = (mouseX - this.view.getPadding()) / this.view.getChartWidth();\n        const newRange = Math.max(1, Math.floor((this.model.getData().length - 1) / currentScaleFactor));\n        const centerIndex = this.model.getStartIndex() + Math.floor((this.model.getEndIndex() - this.model.getStartIndex()) * zoomCenter);\n        const newStartIndex = Math.max(0, centerIndex - Math.floor(newRange * zoomCenter));\n        const newEndIndex = Math.min(this.model.getData().length - 1, newStartIndex + newRange);\n        this.model.updateIndexRange(newStartIndex, newEndIndex);\n        this.draw();\n    }\n    drawTooltip = (event) => {\n        const mouseX = event.offsetX;\n        const startIndex = this.model.getStartIndex();\n        const endIndex = this.model.getEndIndex();\n        const index = Math.floor((mouseX - this.view.getPadding()) / (this.view.getChartWidth() / (endIndex - startIndex + 1)));\n        const data = this.model.getVisibleData();\n        if (index >= 0 && index < data.length) {\n            const point = data[index];\n            const tooltip = document.getElementById(\"tooltip\");\n            if (tooltip) {\n                tooltip.innerHTML = `\n          <p><span>Date:</span>${new Date(point.time * 1000).toISOString().substr(0, 10)}</p>\n          <p><span>O:</span>${point.open}</p>\n          <p><span>C:</span>${point.close}</p>\n          <p><span>H:</span>${point.high}</p>\n          <p><span>L:</span>${point.low}</p>\n          <p><span>V:</span>${point.volume}</p>\n        `;\n            }\n        }\n    };\n    startDrag = (event) => {\n        this.isDragging = true;\n        this.dragStartX = event.offsetX;\n    };\n    stopDrag = () => {\n        this.isDragging = false;\n    };\n    drag(event) {\n        if (this.isDragging) {\n            const candleWidthFactor = this.candleController.getView().getCandleWidthFactor();\n            const chartWidth = this.view.getChartWidth();\n            const startIndex = this.model.getStartIndex();\n            const endIndex = this.model.getEndIndex();\n            const dataLength = this.model.getData().length;\n            const candleWidth = (chartWidth / (endIndex - startIndex + 1)) * candleWidthFactor;\n            const candleSpacing = (chartWidth / (endIndex - startIndex + 1)) * (1 - candleWidthFactor);\n            const dragDistance = event.offsetX - this.dragStartX;\n            const dragCandleCount = Math.round(dragDistance / (candleWidth + candleSpacing));\n            if (dragCandleCount !== 0) {\n                const newStartIndex = startIndex - dragCandleCount;\n                const newEndIndex = endIndex - dragCandleCount;\n                if (newStartIndex >= 0 && newEndIndex < dataLength) {\n                    this.model.updateIndexRange(newStartIndex, newEndIndex);\n                    this.dragStartX = event.offsetX;\n                    this.draw();\n                }\n            }\n        }\n    }\n    bindEventListeners() {\n        const canvas = this.view.getCanvas();\n        canvas.addEventListener(\"wheel\", this.handleWheel.bind(this));\n        canvas.addEventListener(\"mousedown\", this.startDrag.bind(this));\n        canvas.addEventListener(\"mouseup\", this.stopDrag.bind(this));\n        canvas.addEventListener(\"mousemove\", this.drag.bind(this));\n        canvas.addEventListener(\"mouseleave\", this.stopDrag.bind(this));\n        canvas.addEventListener(\"mousemove\", this.drawTooltip.bind(this));\n        const currencyPairSelect = document.getElementById(\"currencyPair\");\n        currencyPairSelect.addEventListener(\"change\", async () => {\n            if (currencyPairSelect.value !== this.currency) {\n                this.currency = currencyPairSelect.value;\n                await this.model.loadData(this.currency);\n                this.draw();\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://currency-pair-chart/./src/controllers/ChartController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_ChartModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/ChartModel */ \"./src/models/ChartModel.ts\");\n/* harmony import */ var _views_ChartView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/ChartView */ \"./src/views/ChartView.ts\");\n/* harmony import */ var _controllers_ChartController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/ChartController */ \"./src/controllers/ChartController.ts\");\n/* harmony import */ var _models_CandleModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/CandleModel */ \"./src/models/CandleModel.ts\");\n/* harmony import */ var _views_CandleView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/CandleView */ \"./src/views/CandleView.ts\");\n/* harmony import */ var _controllers_CandleController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controllers/CandleController */ \"./src/controllers/CandleController.ts\");\n\n\n\n\n\n\n(async () => {\n    try {\n        const chartCanvas = document.getElementById(\"chartCanvas\");\n        if (!chartCanvas) {\n            throw new Error(\"Canvas element not found\");\n        }\n        const context = chartCanvas.getContext(\"2d\");\n        if (!context) {\n            throw new Error(\"2D context not available\");\n        }\n        const chartModel = new _models_ChartModel__WEBPACK_IMPORTED_MODULE_0__.ChartModel();\n        const candleModel = new _models_CandleModel__WEBPACK_IMPORTED_MODULE_3__.CandleModel();\n        const chartView = new _views_ChartView__WEBPACK_IMPORTED_MODULE_1__.ChartView(chartCanvas, context);\n        const candleView = new _views_CandleView__WEBPACK_IMPORTED_MODULE_4__.CandleView(chartCanvas, context);\n        const candleController = new _controllers_CandleController__WEBPACK_IMPORTED_MODULE_5__.CandleController(candleModel, candleView);\n        const chartController = new _controllers_ChartController__WEBPACK_IMPORTED_MODULE_2__.ChartController(chartModel, chartView, candleController);\n        const currencyPairSelect = document.getElementById(\"currencyPair\");\n        if (!currencyPairSelect) {\n            throw new Error(\"Currency pair select element not found\");\n        }\n        await chartController.initialize(currencyPairSelect.value);\n    }\n    catch (error) {\n        console.error(\"Failed to fetch data:\", error);\n    }\n})();\n\n\n//# sourceURL=webpack://currency-pair-chart/./src/index.ts?");

/***/ }),

/***/ "./src/models/CandleModel.ts":
/*!***********************************!*\
  !*** ./src/models/CandleModel.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CandleModel: () => (/* binding */ CandleModel)\n/* harmony export */ });\nclass CandleModel {\n    _data;\n    constructor() {\n        this._data = null;\n    }\n    getCandles() {\n        return this._data;\n    }\n    setData(data) {\n        this._data = data;\n    }\n}\n\n\n//# sourceURL=webpack://currency-pair-chart/./src/models/CandleModel.ts?");

/***/ }),

/***/ "./src/models/ChartModel.ts":
/*!**********************************!*\
  !*** ./src/models/ChartModel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChartModel: () => (/* binding */ ChartModel)\n/* harmony export */ });\n/* harmony import */ var _CandleModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CandleModel */ \"./src/models/CandleModel.ts\");\n\nclass ChartModel {\n    data;\n    startIndex;\n    endIndex;\n    minPrice;\n    maxPrice;\n    candleModel;\n    constructor() {\n        this.data = [];\n        this.startIndex = 0;\n        this.endIndex = 0;\n        this.minPrice = 0;\n        this.maxPrice = 0;\n        this.candleModel = new _CandleModel__WEBPACK_IMPORTED_MODULE_0__.CandleModel();\n    }\n    setData(data) {\n        this.data = data;\n        this.endIndex = data.length - 1;\n        this.updateIndexRange(this.startIndex, this.endIndex);\n        this.calculatePriceRange();\n        if (this.candleModel) {\n            this.candleModel.setData(data);\n        }\n    }\n    getData() {\n        return this.data;\n    }\n    getStartIndex() {\n        return this.startIndex;\n    }\n    getEndIndex() {\n        return this.endIndex;\n    }\n    getMinPrice() {\n        return this.minPrice;\n    }\n    getMaxPrice() {\n        return this.maxPrice;\n    }\n    async loadData(currency) {\n        try {\n            const response = await fetch(`https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=${currency}&Timeframe=1&Start=57674&End=59113&UseMessagePack=false`);\n            const jsonData = await response.json();\n            const mappedData = jsonData[0].Bars.map((point) => ({\n                time: point.Time,\n                volume: point.TickVolume,\n                open: point.Open,\n                close: point.Close,\n                high: point.High,\n                low: point.Low,\n            }));\n            this.setData(mappedData);\n        }\n        catch (error) {\n            console.error(\"Failed to fetch data:\", error);\n        }\n    }\n    getVisibleData() {\n        return this.data.slice(this.startIndex, this.endIndex + 1);\n    }\n    updateIndexRange(startIndex, endIndex) {\n        this.startIndex = Math.max(0, startIndex);\n        this.endIndex = Math.min(this.data.length - 1, endIndex);\n    }\n    calculatePriceRange() {\n        const visibleData = this.getVisibleData();\n        if (visibleData.length === 0) {\n            this.minPrice = 0;\n            this.maxPrice = 0;\n        }\n        else {\n            this.minPrice = Math.min(...visibleData.map((point) => point.low));\n            this.maxPrice = Math.max(...visibleData.map((point) => point.low));\n        }\n    }\n}\n\n\n//# sourceURL=webpack://currency-pair-chart/./src/models/ChartModel.ts?");

/***/ }),

/***/ "./src/views/CandleView.ts":
/*!*********************************!*\
  !*** ./src/views/CandleView.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CandleView: () => (/* binding */ CandleView)\n/* harmony export */ });\nclass CandleView {\n    canvas;\n    context;\n    padding;\n    candleWidthFactor;\n    scaleFactor;\n    verticalScaleFactor;\n    chartWidth;\n    chartHeight;\n    candleHeightFactor;\n    constructor(canvas, context) {\n        this.canvas = canvas;\n        this.context = context;\n        this.padding = 50;\n        this.candleWidthFactor = 0.5;\n        this.scaleFactor = 0.8;\n        this.verticalScaleFactor = 0.4;\n        this.chartWidth = canvas.width - 2 * this.padding;\n        this.chartHeight = canvas.height - 2 * this.padding;\n        this.candleHeightFactor = this.padding * 3;\n    }\n    getCandleWidthFactor() {\n        return this.candleWidthFactor;\n    }\n    drawCandles(data, startIndex, endIndex, minPrice, maxPrice) {\n        const ctx = this.context;\n        const candleWidth = (this.chartWidth / (endIndex - startIndex + 1)) * this.candleWidthFactor;\n        const candleSpacing = (this.chartWidth / (endIndex - startIndex + 1)) * (1 - this.candleWidthFactor);\n        const priceRange = maxPrice - minPrice;\n        const scaleY = (this.chartHeight / priceRange) * this.verticalScaleFactor;\n        for (let i = startIndex; i <= endIndex; i++) {\n            const point = data[i];\n            if (point && typeof point.high === \"number\" && typeof point.low === \"number\" && typeof point.open === \"number\" && typeof point.close === \"number\") {\n                const x = this.padding + 1 + (i - startIndex) * (candleWidth + candleSpacing) + candleSpacing / 2;\n                const yhigh = this.canvas.height - this.candleHeightFactor - (point.high - minPrice) * scaleY;\n                const ylow = this.canvas.height - this.candleHeightFactor - (point.low - minPrice) * scaleY;\n                const yopen = this.canvas.height - this.candleHeightFactor - (point.open - minPrice) * scaleY;\n                const yclose = this.canvas.height - this.candleHeightFactor - (point.close - minPrice) * scaleY;\n                ctx.fillStyle = point.open > point.close ? \"#fa4644\" : \"#22b996\";\n                ctx.strokeStyle = ctx.fillStyle;\n                ctx.fillRect(x - candleWidth / 2, yopen, candleWidth, yclose - yopen);\n                ctx.beginPath();\n                ctx.moveTo(x, yhigh);\n                ctx.lineTo(x, ylow);\n                ctx.stroke();\n            }\n            else {\n                console.error(\"Invalid data point:\", point);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://currency-pair-chart/./src/views/CandleView.ts?");

/***/ }),

/***/ "./src/views/ChartView.ts":
/*!********************************!*\
  !*** ./src/views/ChartView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChartView: () => (/* binding */ ChartView)\n/* harmony export */ });\nclass ChartView {\n    canvas;\n    context;\n    padding;\n    chartWidth;\n    chartHeight;\n    candleWidthFactor;\n    scaleFactor;\n    constructor(canvas, context) {\n        this.canvas = canvas;\n        this.context = context;\n        this.padding = 50;\n        this.chartWidth = this.canvas.width - this.padding * 2;\n        this.chartHeight = this.canvas.height - this.padding * 2;\n        this.candleWidthFactor = 0.5;\n        this.scaleFactor = 0.8;\n    }\n    getScaleFactor() {\n        return this.scaleFactor;\n    }\n    setScaleFactor(scaleFactor) {\n        this.scaleFactor = scaleFactor;\n    }\n    getChartWidth() {\n        return this.chartWidth;\n    }\n    getPadding() {\n        return this.padding;\n    }\n    getContext() {\n        return this.context;\n    }\n    getCandleWidthFactor() {\n        return this.candleWidthFactor;\n    }\n    getCanvas() {\n        return this.canvas;\n    }\n    drawAxes() {\n        const ctx = this.context;\n        ctx.beginPath();\n        ctx.moveTo(this.padding, this.padding);\n        ctx.lineTo(this.padding, this.canvas.height - this.padding);\n        ctx.lineTo(this.canvas.width - this.padding, this.canvas.height - this.padding);\n        ctx.strokeStyle = \"#111\";\n        ctx.stroke();\n    }\n    drawGridLines(minPrice, maxPrice) {\n        const ctx = this.context;\n        const numOfVerticalLines = 15;\n        const numOfHorizontalLines = 10;\n        const dashLength = 2;\n        const lineWidth = 0.5;\n        ctx.beginPath();\n        ctx.lineWidth = lineWidth;\n        ctx.setLineDash([dashLength, dashLength]);\n        ctx.strokeStyle = \"#ccc\";\n        const verticalSpacing = this.chartWidth / numOfVerticalLines;\n        for (let i = 1; i < numOfVerticalLines; i++) {\n            const x = this.padding + i * verticalSpacing;\n            ctx.moveTo(x, this.padding);\n            ctx.lineTo(x, this.canvas.height - this.padding);\n        }\n        const horizontalSpacing = this.chartHeight / numOfHorizontalLines;\n        for (let i = 1; i < numOfHorizontalLines; i++) {\n            const y = this.canvas.height - this.padding - i * horizontalSpacing;\n            ctx.moveTo(this.padding, y);\n            ctx.lineTo(this.canvas.width - this.padding, y);\n        }\n        ctx.stroke();\n        ctx.setLineDash([]);\n    }\n    drawPriceScale(minPrice, maxPrice) {\n        const ctx = this.context;\n        const numOfTicks = 10;\n        const priceRange = maxPrice - minPrice;\n        const tickSpacing = this.chartHeight / numOfTicks;\n        const priceSpacing = priceRange / numOfTicks;\n        ctx.fillStyle = \"black\";\n        ctx.strokeStyle = \"black\";\n        ctx.textAlign = \"right\";\n        ctx.textBaseline = \"middle\";\n        for (let i = 0; i <= numOfTicks; i++) {\n            const y = this.canvas.height - this.padding - i * tickSpacing;\n            const price = minPrice + i * priceSpacing;\n            ctx.fillText(price.toFixed(4), this.padding - 10, y);\n            ctx.beginPath();\n            ctx.moveTo(this.padding - 5, y);\n            ctx.lineTo(this.padding, y);\n            ctx.stroke();\n        }\n    }\n    drawDateScale(data, startIndex, endIndex) {\n        const ctx = this.context;\n        const candleWidth = (this.chartWidth / (endIndex - startIndex + 1)) * 0.8;\n        const candleSpacing = (this.chartWidth / (endIndex - startIndex + 1)) * (1 - 0.8);\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.textBaseline = \"top\";\n        const dateCount = 15;\n        const dateStep = Math.max(1, Math.floor((endIndex - startIndex + 1) / dateCount));\n        for (let i = startIndex; i <= endIndex; i += dateStep) {\n            const x = this.padding + (i - startIndex) * (candleWidth + candleSpacing) + candleWidth / 2;\n            const date = new Date(data[i].time * 1000).toISOString().substr(11, 5);\n            ctx.fillText(date, x, this.canvas.height - this.padding + 10);\n        }\n    }\n    drawVolumes(data, startIndex, endIndex) {\n        const ctx = this.context;\n        const candleWidth = (this.chartWidth / (endIndex - startIndex + 1)) * 0.8;\n        const candleSpacing = (this.chartWidth / (endIndex - startIndex + 1)) * 0.2;\n        const volumeMaxHeight = this.chartHeight * 0.2;\n        const maxVolume = Math.max(...data.slice(startIndex, endIndex + 1).map((d) => d.volume));\n        const scaleY = volumeMaxHeight / maxVolume;\n        for (let i = startIndex; i <= endIndex; i++) {\n            const point = data[i];\n            if (point && point.volume !== undefined) {\n                const x = this.padding + 3 + (i - startIndex) * (candleWidth + candleSpacing) + candleSpacing / 2;\n                const volumeHeight = point.volume * scaleY;\n                const yVolume = this.chartHeight + this.padding - 2;\n                ctx.fillStyle = \"#ccc\";\n                ctx.fillRect(x - candleWidth / 2, yVolume, candleWidth, -volumeHeight);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://currency-pair-chart/./src/views/ChartView.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;