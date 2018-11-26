import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { IOrder, Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { LoadOrders, LoadOrdersSuccess,
        CreateOrder, CreateOrderSuccess,
        UpdateOrder, OrderActionTypes,
        DeleteOrder,
        LoadOrder, LoadOrderSuccess,
        UpdateOrderSuccess, DeleteOrderSuccess } from '../actions/order.action';
import { LoadGlobalError } from '../../../../shared/errors/state/error.actions';

@Injectable()

export class OrderEffects {
  @Effect()
  getOrders$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOrders>(OrderActionTypes.LoadOrders),
    switchMap(() => this.orderService.getOrders().pipe(
      map((orders: IOrder[]) => new LoadOrdersSuccess(orders)),
      catchError(err => of(new LoadGlobalError(err)))
    ))
  );

  @Effect()
  getOrder$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOrder>(OrderActionTypes.LoadOrder),
    map((action: LoadOrder) => action.payload),
    switchMap((orderId: number) => this.orderService.getOrderById(orderId).pipe(
      map((order: Order) => new LoadOrderSuccess(order)),
      catchError(err => of(new LoadGlobalError(err)))
    ))
  );

  @Effect()
  createOrder$: Observable<Action> = this.actions$.pipe(
    ofType<CreateOrder>(OrderActionTypes.CreateOrder),
    map((action: CreateOrder) => action.payload),
    switchMap((order: IOrder) => this.orderService.createOrder(order).pipe(
      map((newOrder: Order) => new CreateOrderSuccess(newOrder)),
      catchError(err => of(new LoadGlobalError(err)))
    ))
  );

  @Effect()
  updateOrder$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateOrder>(OrderActionTypes.UpdateOrder),
    map((action: UpdateOrder) => action.payload),
    switchMap((updateOrder) => this.orderService.updateOrder(updateOrder).pipe(
      map((updatedOrder: IOrder) => new UpdateOrderSuccess({
        id: updateOrder.id,
        changes: updatedOrder
      })),
      catchError(err => of(new LoadGlobalError(err)))
    ))
  );

  @Effect()
  deleteOrder$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteOrder>(OrderActionTypes.DeleteOrder),
    map((action: DeleteOrder) => action.payload),
    switchMap(
      (id: number) => this.orderService.deleteOrder(id).pipe(
        map(() => new DeleteOrderSuccess(id)),
        catchError(err => of(new LoadGlobalError(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) { }

}
