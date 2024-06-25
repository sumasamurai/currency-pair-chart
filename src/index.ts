import { ChartModel } from "./models/ChartModel";
import { ChartView } from "./views/ChartView";
import { ChartController } from "./controllers/ChartController";
import { CandleModel } from "./models/CandleModel";
import { CandleView } from "./views/CandleView";
import { CandleController } from "./controllers/CandleController";
import { ButtonView } from "./views/ButtonView";
import { ButtonModel } from "./models/ButtonModel";

(async () => {
  try {
    const chartCanvas = document.getElementById("chartCanvas") as HTMLCanvasElement;
    if (!chartCanvas) {
      throw new Error("Canvas element not found");
    }

    const context = chartCanvas.getContext("2d");
    if (!context) {
      throw new Error("2D context not available");
    }

    const chartModel = new ChartModel();
    const candleModel = new CandleModel();

    const chartView = new ChartView(chartCanvas, context);
    const candleView = new CandleView(chartCanvas, context);

    const button1View = new ButtonView(context, 50, 50, 100, 30, "Button 1", "Button 1 clicked");
    const button1Model = new ButtonModel(button1View);
    const button2View = new ButtonView(context, 160, 50, 100, 30, "Button 2", "Button 2 clicked");
    const button2Model = new ButtonModel(button2View);

    const candleController = new CandleController(candleModel, candleView);

    const chartController = new ChartController(chartModel, chartView, candleController, button1Model, button2Model);

    const currencyPairSelect = document.getElementById("currencyPair") as HTMLSelectElement;

    if (!currencyPairSelect) {
      throw new Error("Currency pair select element not found");
    }

    await chartController.initialize(currencyPairSelect.value);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
})();
