import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IOrder } from '../models/order.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private ordersUrl = 'api/orders';

  constructor(
    public http: HttpClient,
    private toastrService: ToastrService) {}

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.ordersUrl).pipe(
      map(orders => {
        this.calculateOrderTotal(orders);
        return orders;
      })
    );
  }

  getOrderById(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.ordersUrl}/${id}`).pipe(
      map(order => {
        this.calculateOrderTotal([order]);
        return order;
      }));
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.ordersUrl, order)
      .pipe(
        tap(() =>
          this.toastrService.success(`${order.merchantName} Order added`)
        )
      );
  }

  updateOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.ordersUrl}/${order.id}`, order)
      .pipe(
        tap(() =>
          this.toastrService.success(`${order.merchantName} Order updated`)
        )
      );
  }

  deleteOrder(payload: number) {
    return this.http.delete(`${this.ordersUrl}/${payload}`)
      .pipe(
        tap(() =>
          this.toastrService.success(`Order successfully deleted`)
        )
      );
  }

  calculateOrderTotal(orders: IOrder[]) {
    for (const order of orders) {
      if (order) {
        order.totalAmount = order.price * order.invoiceAmount;
      }
    }
  }

}
