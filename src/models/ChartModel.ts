import { CandleModel } from "./CandleModel";
import { IChartData } from "../types/IChartData";

export class ChartModel {
  private data: IChartData[];
  private startIndex: number;
  private endIndex: number;
  private minPrice: number;
  private maxPrice: number;
  private candleModel: CandleModel;

  constructor() {
    this.data = [];
    this.startIndex = 0;
    this.endIndex = 0;
    this.minPrice = 0;
    this.maxPrice = 0;
    this.candleModel = new CandleModel();
  }

  setData(data: IChartData[]) {
    this.data = data;
    this.endIndex = data.length - 1;
    this.updateIndexRange(this.startIndex, this.endIndex);
    this.calculatePriceRange()
    if (this.candleModel) {
      this.candleModel.setData(data);
    }
  }

  getData(): IChartData[] {
    return this.data;
  }

  getStartIndex(): number {
    return this.startIndex;
  }

  getEndIndex(): number {
    return this.endIndex;
  }

  getMinPrice(): number {
    return this.minPrice;
  }

  getMaxPrice(): number {
    return this.maxPrice;
  }

  async loadData(currency: string) {
    try {
      const response = await fetch(`https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=${currency}&Timeframe=1&Start=57674&End=59113&UseMessagePack=false`);
      const jsonData: { Bars: any[] }[] = await response.json();
      const mappedData: IChartData[] = jsonData[0].Bars.map((point: any) => ({
        time: point.Time,
        volume: point.TickVolume,
        open: point.Open,
        close: point.Close,
        high: point.High,
        low: point.Low,
      }));
      this.setData(mappedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  getVisibleData(): IChartData[] {
    return this.data.slice(this.startIndex, this.endIndex + 1);
  }

  updateIndexRange(startIndex: number, endIndex: number) {
    this.startIndex = Math.max(0, startIndex);
    this.endIndex = Math.min(this.data.length - 1, endIndex);
  }

  calculatePriceRange() {
    const visibleData = this.getVisibleData();

    if (visibleData.length === 0) {
      this.minPrice = 0;
      this.maxPrice = 0;
    } else {
      this.minPrice = Math.min(...visibleData.map((point) => point.low));
      this.maxPrice = Math.max(...visibleData.map((point) => point.low));
    }
  }
}
