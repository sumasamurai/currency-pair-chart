export class CandleModel {
  private _data: any[] | null;

  constructor() {
    this._data = null;
  }

  getCandles(): any[] | null {
    return this._data;
  }

  setData(data: any[]): void {
    this._data = data;
  }
}
