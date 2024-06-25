import { ButtonView } from "../views/ButtonView";

export class ButtonModel {
  private buttonView: ButtonView;

  constructor(buttonView: ButtonView) {
    this.buttonView = buttonView;
    this.buttonView.setOnClickHandler(this.handleButtonClick);
  }

  getButtonProperties() {
    return this.buttonView.getButtonProperties();
  }

  private handleButtonClick = (log: string) => {
    console.log(log);
  };
}