import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, first, tap} from 'rxjs/operators';
import { IOrder } from '../../models/order.model';
import { LoadOrder, getOrderById, OrderModuleState } from '../../state';

@Injectable({
  providedIn: 'root'
})

export class OrderResolver implements Resolve<IOrder> {

  constructor(private store: Store<OrderModuleState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrder> {

    const orderId = route.params['id'];

    return this.store
      .pipe(
        select(getOrderById(orderId)),
        tap(order => {
          if (!order) {
            this.store.dispatch(new LoadOrder(orderId));
          }
        }),
        filter(orders => !!orders),
        first()
      );
  }
}
