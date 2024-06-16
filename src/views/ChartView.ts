import { IChartData } from "../types/IChartData";

export class ChartView {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private padding: number;
  private chartWidth: number;
  private chartHeight: number;
  private candleWidthFactor: number;
  private scaleFactor: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.padding = 50;
    this.chartWidth = this.canvas.width - this.padding * 2;
    this.chartHeight = this.canvas.height - this.padding * 2;
    this.candleWidthFactor = 0.5;
    this.scaleFactor = 0.8;
  }

  getScaleFactor(): number {
    return this.scaleFactor;
  }

  setScaleFactor(scaleFactor: number) {
    this.scaleFactor = scaleFactor;
  }

  getChartWidth(): number {
    return this.chartWidth;
  }

  getPadding(): number {
    return this.padding;
  }

  getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  getCandleWidthFactor(): number {
    return this.candleWidthFactor;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  drawAxes(): void {
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(this.padding, this.padding);
    ctx.lineTo(this.padding, this.canvas.height - this.padding);
    ctx.lineTo(this.canvas.width - this.padding, this.canvas.height - this.padding);
    ctx.strokeStyle = "#111";
    ctx.stroke();
  }

  drawGridLines(minPrice: number, maxPrice: number): void {
    const ctx = this.context;
    const numOfVerticalLines = 15;
    const numOfHorizontalLines = 10;
    const dashLength = 2;
    const lineWidth = 0.5;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.setLineDash([dashLength, dashLength]);
    ctx.strokeStyle = "#ccc";

    const verticalSpacing = this.chartWidth / numOfVerticalLines;
    for (let i = 1; i < numOfVerticalLines; i++) {
      const x = this.padding + i * verticalSpacing;
      ctx.moveTo(x, this.padding);
      ctx.lineTo(x, this.canvas.height - this.padding);
    }

    const horizontalSpacing = this.chartHeight / numOfHorizontalLines;
    for (let i = 1; i < numOfHorizontalLines; i++) {
      const y = this.canvas.height - this.padding - i * horizontalSpacing;
      ctx.moveTo(this.padding, y);
      ctx.lineTo(this.canvas.width - this.padding, y);
    }

    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawPriceScale(minPrice: number, maxPrice: number): void {
    const ctx = this.context;
    const numOfTicks = 10;
    const priceRange = maxPrice - minPrice;
    const tickSpacing = this.chartHeight / numOfTicks;
    const priceSpacing = priceRange / numOfTicks;

    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let i = 0; i <= numOfTicks; i++) {
      const y = this.canvas.height - this.padding - i * tickSpacing;
      const price = minPrice + i * priceSpacing;
      ctx.fillText(price.toFixed(4), this.padding - 10, y);
      ctx.beginPath();
      ctx.moveTo(this.padding - 5, y);
      ctx.lineTo(this.padding, y);
      ctx.stroke();
    }
  }

  drawDateScale(data: IChartData[], startIndex: number, endIndex: number): void {
    const ctx = this.context;

    const candleWidth = (this.chartWidth / (endIndex - startIndex + 1)) * 0.8;
    const candleSpacing = (this.chartWidth / (endIndex - startIndex + 1)) * (1 - 0.8);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const dateCount = 15;
    const dateStep = Math.max(1, Math.floor((endIndex - startIndex + 1) / dateCount));

    for (let i = startIndex; i <= endIndex; i += dateStep) {
      const x = this.padding + (i - startIndex) * (candleWidth + candleSpacing) + candleWidth / 2;
      const date = new Date(data[i].time * 1000).toISOString().substr(11, 5);
      ctx.fillText(date, x, this.canvas.height - this.padding + 10);
    }
  }

  drawVolumes(data: IChartData[], startIndex: number, endIndex: number): void {
    const ctx = this.context;
    const candleWidth = (this.chartWidth / (endIndex - startIndex + 1)) * 0.8;
    const candleSpacing = (this.chartWidth / (endIndex - startIndex + 1)) * 0.2;
    const volumeMaxHeight = this.chartHeight * 0.2;
    const maxVolume = Math.max(...data.slice(startIndex, endIndex + 1).map((d) => d.volume));
    const scaleY = volumeMaxHeight / maxVolume;

    for (let i = startIndex; i <= endIndex; i++) {
      const point = data[i];
      if (point && point.volume !== undefined) {
        const x = this.padding + 3 + (i - startIndex) * (candleWidth + candleSpacing) + candleSpacing / 2;
        const volumeHeight = point.volume * scaleY;
        const yVolume = this.chartHeight + this.padding - 2;

        ctx.fillStyle = "#ccc";
        ctx.fillRect(x - candleWidth / 2, yVolume, candleWidth, -volumeHeight);
      }
    }
  }
}
