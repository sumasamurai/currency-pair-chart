import { ButtonModel } from "../models/ButtonModel";

export class ButtonController {
  private model: ButtonModel;

  constructor(model: ButtonModel) {
    this.model = model;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const buttonProperties = this.model.getButtonProperties();

    ctx.fillStyle = "#007BFF";
    ctx.fillRect(buttonProperties.x, buttonProperties.y, buttonProperties.width, buttonProperties.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(buttonProperties.text, buttonProperties.x + buttonProperties.width / 2, buttonProperties.y + buttonProperties.height / 2);
  }
}
