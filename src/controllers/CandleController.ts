import { CandleModel } from "../models/CandleModel";
import { CandleView } from "../views/CandleView";
import { IChartData } from "../types/IChartData";

export class CandleController {
  private model: CandleModel;
  private view: CandleView;

  constructor(candleModel: CandleModel, candleView: CandleView) {
    this.model = candleModel;
    this.view = candleView;
  }

  getModel(): CandleModel {
    return this.model;
  }

  getView(): CandleView {
    return this.view;
  }

  drawCandles(data: IChartData[], startIndex: number, endIndex: number, minPrice: number, maxPrice: number): void {
    this.view.drawCandles(data, startIndex, endIndex, minPrice, maxPrice);
  }
}
