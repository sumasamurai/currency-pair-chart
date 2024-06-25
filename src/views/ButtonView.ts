export class ButtonView {
    private context: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private text: string;
    private log: string;
    
    constructor(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, text: string, log: string) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.text = text;
      this.log = log;
      this.context = context;
  
      this.draw();
      this.setupEvents();
    }
  
    public draw() {
      this.context.fillStyle = "#007BFF";
      this.context.fillRect(this.x, this.y, this.width, this.height);
  
      this.context.fillStyle = "#FFFFFF";
      this.context.font = "14px Arial";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
  
    private setupEvents() {
      this.context.canvas.addEventListener("click", this.onClick);
    }
  
    private onClick = (event: MouseEvent) => {
      if (this.isInsideButton(event.offsetX, event.offsetY)) {
        console.log(this.log);
      }
    };
  
    private isInsideButton(x: number, y: number): boolean {
      return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }
  
    public setOnClickHandler(handler: (log: string) => void) {
      this.onClick = (event: MouseEvent) => {
        if (this.isInsideButton(event.offsetX, event.offsetY)) {
          handler(this.log);
        }
      };
    }
  
    public getButtonProperties() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        text: this.text,
        log: this.log
      };
    }
  }
  