export interface IOrder {
  id: number;
  merchantName: string;
  itemName: string;
  invoiceAmount: number;
  currencyType: string;
  price: number;
  totalAmount?: number;
}

export class Order implements IOrder {
  id: number;
  merchantName: string;
  itemName: string;
  invoiceAmount: number;
  currencyType: string;
  price: number;
  totalAmount: number;

  constructor(order: IOrder) {
    this.id = order.id;
    this.merchantName = order.merchantName;
    this.itemName = order.itemName;
    this.invoiceAmount = +order.invoiceAmount;
    this.currencyType = order.currencyType;
    this.price = +order.price;
    this.totalAmount = +this.price * this.invoiceAmount;
  }
}

