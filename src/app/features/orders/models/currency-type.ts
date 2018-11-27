export interface ICurrencyType {
  id: number;
  name: string;
  symbol: string;
}

export class CurrencyType {
  id: number;
  name: string;
  symbol: string;

  constructor(data) {
    Object.assign(this, data);
  }
}

