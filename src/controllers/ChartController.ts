import { ChartModel } from "../models/ChartModel";
import { ChartView } from "../views/ChartView";
import { CandleController } from "./CandleController";
import { ButtonModel } from "../models/ButtonModel";
import { ButtonController } from "./ButtonController";

export class ChartController {
  private model: ChartModel;
  private view: ChartView;
  private candleController: CandleController;

  private buttonController1: ButtonController;
  private buttonController2: ButtonController;
  private isDragging: boolean;
  private dragStartX: number;
  private currency: string | null;

  constructor(model: ChartModel, view: ChartView, candleController: CandleController, button1Model: ButtonModel, button2Model: ButtonModel) {
    this.model = model;
    this.view = view;
    this.candleController = candleController;

    this.buttonController1 = new ButtonController(button1Model);
    this.buttonController2 = new ButtonController(button2Model);

    this.isDragging = false;
    this.dragStartX = 0;
    this.currency = null;

    this.bindEventListeners();
  }

  async initialize(currency: string) {
    await this.model.loadData(currency);

    this.draw();
  }

  private draw() {
    const ctx = this.view.getContext();
    ctx.clearRect(0, 0, this.view.getCanvas().width, this.view.getCanvas().height);

    const data = this.model.getData();
    const minPrice = this.model.getMinPrice();
    const maxPrice = this.model.getMaxPrice();
    const startIndex = this.model.getStartIndex();
    const endIndex = this.model.getEndIndex();

    this.model.calculatePriceRange();
    this.view.drawAxes();
    this.view.drawGridLines(minPrice, maxPrice);
    this.candleController.drawCandles(data, startIndex, endIndex, minPrice, maxPrice);

    this.view.drawPriceScale(minPrice, maxPrice);
    this.view.drawDateScale(data, startIndex, endIndex);
    this.view.drawVolumes(data, startIndex, endIndex);
    this.buttonController1.draw(ctx);
    this.buttonController2.draw(ctx);
  }

  handleWheel(event: WheelEvent) {
    if (event.deltaY < 0) {
      this.zoomIn(event);
    } else {
      this.zoomOut(event);
    }
  }

  private zoomIn(event: WheelEvent) {
    const zoomIntensity = 0.1;
    const currentScaleFactor = this.view.getScaleFactor();
    const updatedScaleFactor = Math.max(1, currentScaleFactor * (1 + zoomIntensity));

    this.view.setScaleFactor(updatedScaleFactor);

    const mouseX = event.offsetX;
    const zoomCenter = (mouseX - this.view.getPadding()) / this.view.getChartWidth();
    const newRange = Math.max(1, Math.floor((this.model.getData().length - 1) / currentScaleFactor));
    const centerIndex = this.model.getStartIndex() + Math.floor((this.model.getEndIndex() - this.model.getStartIndex()) * zoomCenter);
    const newStartIndex = Math.max(0, centerIndex - Math.floor(newRange * zoomCenter));
    const newEndIndex = Math.min(this.model.getData().length - 1, newStartIndex + newRange);

    this.model.updateIndexRange(newStartIndex, newEndIndex);

    this.draw();
  }

  private zoomOut(event: WheelEvent) {
    const zoomIntensity = 0.1;
    const currentScaleFactor = this.view.getScaleFactor();
    const updatedScaleFactor = Math.max(1, currentScaleFactor * (1 - zoomIntensity));

    this.view.setScaleFactor(updatedScaleFactor);

    const mouseX = event.offsetX;
    const zoomCenter = (mouseX - this.view.getPadding()) / this.view.getChartWidth();
    const newRange = Math.max(1, Math.floor((this.model.getData().length - 1) / currentScaleFactor));
    const centerIndex = this.model.getStartIndex() + Math.floor((this.model.getEndIndex() - this.model.getStartIndex()) * zoomCenter);
    const newStartIndex = Math.max(0, centerIndex - Math.floor(newRange * zoomCenter));
    const newEndIndex = Math.min(this.model.getData().length - 1, newStartIndex + newRange);

    this.model.updateIndexRange(newStartIndex, newEndIndex);

    this.draw();
  }

  private drawTooltip = (event: MouseEvent) => {
    const mouseX = event.offsetX;
    const startIndex = this.model.getStartIndex();
    const endIndex = this.model.getEndIndex();

    const index = Math.floor((mouseX - this.view.getPadding()) / (this.view.getChartWidth() / (endIndex - startIndex + 1)));
    const data = this.model.getVisibleData();
    if (index >= 0 && index < data.length) {
      const point = data[index];
      const tooltip = document.getElementById("tooltip");
      if (tooltip) {
        tooltip.innerHTML = `
          <p><span>Date:</span>${new Date(point.time * 1000).toISOString().substr(0, 10)}</p>
          <p><span>O:</span>${point.open}</p>
          <p><span>C:</span>${point.close}</p>
          <p><span>H:</span>${point.high}</p>
          <p><span>L:</span>${point.low}</p>
          <p><span>V:</span>${point.volume}</p>
        `;
      }
    }
  };

  private startDrag = (event: MouseEvent) => {
    this.isDragging = true;
    this.dragStartX = event.offsetX;
  };

  private stopDrag = () => {
    this.isDragging = false;
  };

  private drag(event: MouseEvent) {
    if (this.isDragging) {
      const candleWidthFactor = this.candleController.getView().getCandleWidthFactor();

      const chartWidth = this.view.getChartWidth();
      const startIndex = this.model.getStartIndex();
      const endIndex = this.model.getEndIndex();
      const dataLength = this.model.getData().length;

      const candleWidth = (chartWidth / (endIndex - startIndex + 1)) * candleWidthFactor;
      const candleSpacing = (chartWidth / (endIndex - startIndex + 1)) * (1 - candleWidthFactor);
      const dragDistance = event.offsetX - this.dragStartX;
      const dragCandleCount = Math.round(dragDistance / (candleWidth + candleSpacing));

      if (dragCandleCount !== 0) {
        const newStartIndex = startIndex - dragCandleCount;
        const newEndIndex = endIndex - dragCandleCount;

        if (newStartIndex >= 0 && newEndIndex < dataLength) {
          this.model.updateIndexRange(newStartIndex, newEndIndex);
          this.dragStartX = event.offsetX;

          this.draw();
        }
      }
    }
  }

  bindEventListeners() {
    const canvas = this.view.getCanvas();
    canvas.addEventListener("wheel", this.handleWheel.bind(this));
    canvas.addEventListener("mousedown", this.startDrag.bind(this));
    canvas.addEventListener("mouseup", this.stopDrag.bind(this));
    canvas.addEventListener("mousemove", this.drag.bind(this));
    canvas.addEventListener("mouseleave", this.stopDrag.bind(this));
    canvas.addEventListener("mousemove", this.drawTooltip.bind(this));

    const currencyPairSelect = document.getElementById("currencyPair") as HTMLSelectElement;

    currencyPairSelect.addEventListener("change", async () => {
      if (currencyPairSelect.value !== this.currency) {
        this.currency = currencyPairSelect.value;
        await this.model.loadData(this.currency);
        this.draw();
      }
    });
  }
}
