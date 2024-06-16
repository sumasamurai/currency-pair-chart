export class CandleView {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public padding: number;
  public candleWidthFactor: number;
  public scaleFactor: number;
  public verticalScaleFactor: number;
  public chartWidth: number;
  public chartHeight: number;
  public candleHeightFactor: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.padding = 50;
    this.candleWidthFactor = 0.5;
    this.scaleFactor = 0.8;
    this.verticalScaleFactor = 0.4;
    this.chartWidth = canvas.width - 2 * this.padding;
    this.chartHeight = canvas.height - 2 * this.padding;
    this.candleHeightFactor = this.padding * 3;
  }

  getCandleWidthFactor() {
    return this.candleWidthFactor;
  }

  drawCandles(data: any[], startIndex: number, endIndex: number, minPrice: number, maxPrice: number): void {
    const ctx = this.context;
    const candleWidth = (this.chartWidth / (endIndex - startIndex + 1)) * this.candleWidthFactor;
    const candleSpacing = (this.chartWidth / (endIndex - startIndex + 1)) * (1 - this.candleWidthFactor);
    const priceRange = maxPrice - minPrice;
    const scaleY = (this.chartHeight / priceRange) * this.verticalScaleFactor;

    for (let i = startIndex; i <= endIndex; i++) {
      const point = data[i];
      if (point && typeof point.high === "number" && typeof point.low === "number" && typeof point.open === "number" && typeof point.close === "number") {
        const x = this.padding + 1 + (i - startIndex) * (candleWidth + candleSpacing) + candleSpacing / 2;
        const yhigh = this.canvas.height - this.candleHeightFactor - (point.high - minPrice) * scaleY;
        const ylow = this.canvas.height - this.candleHeightFactor - (point.low - minPrice) * scaleY;
        const yopen = this.canvas.height - this.candleHeightFactor - (point.open - minPrice) * scaleY;
        const yclose = this.canvas.height - this.candleHeightFactor - (point.close - minPrice) * scaleY;

        ctx.fillStyle = point.open > point.close ? "#fa4644" : "#22b996";
        ctx.strokeStyle = ctx.fillStyle;

        ctx.fillRect(x - candleWidth / 2, yopen, candleWidth, yclose - yopen);

        ctx.beginPath();
        ctx.moveTo(x, yhigh);
        ctx.lineTo(x, ylow);
        ctx.stroke();
      } else {
        console.error("Invalid data point:", point);
      }
    }
  }
}
