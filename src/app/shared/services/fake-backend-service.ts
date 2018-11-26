import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IOrder } from '../../features/orders/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService implements InMemoryDbService {
  createDb() {
    let orders: IOrder[] = [
    {
        id: 4,
        merchantName: 'CrazyCups',
        itemName: 'Cups',
        invoiceAmount: 0.09766545,
        currencyType: 'BTC',
        price: 4028.11,
        totalAmount: 393.4071757995
      },
      {
        id: 5,
        merchantName: 'ShirtTown',
        itemName: 'T-Shirts',
        invoiceAmount: 1.43219876,
        currencyType: 'BCH',
        price: 31.34,
        totalAmount: 44.8851091384
      },
      {
        id: 6,
        merchantName: 'GimmeGold',
        itemName: 'Gold Bullion',
        invoiceAmount: 10.78654328,
        currencyType: 'BTC',
        price: 4045.47,
        totalAmount: 43636.6372429416
      },
      {
        id: 7,
        merchantName: 'Merchant',
        itemName: 'ABC',
        invoiceAmount: 1.43219876,
        currencyType: 'BTC',
        price: 4007.93,
        totalAmount: 5740.1523761667995
      }
    ];
    return {
        orders: orders
    };
  }

  // Overrides the genId method to ensure that a order always has an id.
  // If the orders array is empty,
  // the method below returns the initial number (11).
  // if the orders array is not empty, the method below returns the highest
  // order id + 1.
  genId(orders: IOrder[]): number {
    return orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 11;
  }
}
