import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Order, IOrder } from '../../models/order.model';

export enum OrderActionTypes {
  LoadOrders = '[Orders] Load All',
  LoadOrdersSuccess = '[Orders] Load Success',
  LoadOrdersFail = '[Orders] Load Fail',
  LoadOrder = '[Order] Load',
  LoadOrderSuccess = '[Order] Load Success',
  LoadOrderFail = '[Order] Load Fail',
  CreateOrder = '[Order] Create',
  CreateOrderSuccess = '[Order] Create Success',
  CreateOrderFail = '[Order] Create Fail',
  UpdateOrder = '[Order] Update',
  UpdateOrderSuccess = '[Order] Update Success',
  UpdateOrderFail = '[Order] Update Fail',
  DeleteOrder = '[Order] Delete Order',
  DeleteOrderSuccess = '[Order] Delete Success',
  DeleteOrderFail = '[Order] Delete Fail'
}

export class LoadOrders implements Action {
  readonly type = OrderActionTypes.LoadOrders;
}

export class LoadOrdersSuccess implements Action {
  readonly type = OrderActionTypes.LoadOrdersSuccess;

  constructor(public payload: IOrder[]) {}
}

export class LoadOrdersFail implements Action {
  readonly type = OrderActionTypes.LoadOrdersFail;

  constructor(public payload: string) {}
}

export class LoadOrder implements Action {
  readonly type = OrderActionTypes.LoadOrder;

  constructor(public payload: number) {}
}

export class LoadOrderSuccess implements Action {
  readonly type = OrderActionTypes.LoadOrderSuccess;

  constructor(public payload: Order) {}
}

export class LoadOrderFail implements Action {
  readonly type = OrderActionTypes.LoadOrderFail;

  constructor(public payload: string) {}
}

export class CreateOrder implements Action {
  readonly type = OrderActionTypes.CreateOrder;

  constructor(public payload: IOrder) { }
}

export class CreateOrderSuccess implements Action {
  readonly type = OrderActionTypes.CreateOrderSuccess;

  constructor(public payload: IOrder) { }
}

export class CreateOrderFail implements Action {
  readonly type = OrderActionTypes.CreateOrderFail;

  constructor(public payload: string) { }
}

export class UpdateOrder implements Action {
  readonly type = OrderActionTypes.UpdateOrder;

  constructor(public payload: IOrder) { }
}

export class UpdateOrderSuccess implements Action {
  readonly type = OrderActionTypes.UpdateOrderSuccess;

  constructor(public payload: Update<IOrder>) {}
}

export class UpdateOrderFail implements Action {
  readonly type = OrderActionTypes.UpdateOrderFail;

  constructor(public payload: string) { }
}

export class DeleteOrder implements Action {
  readonly type = OrderActionTypes.DeleteOrder;

  constructor(public payload: number) { }
}

export class DeleteOrderSuccess implements Action {
  readonly type = OrderActionTypes.DeleteOrderSuccess;

  constructor(public payload: number) { }
}

export class DeleteOrderFail implements Action {
  readonly type = OrderActionTypes.DeleteOrderFail;

  constructor(public payload: string) { }
}

export type Action =
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFail
  | UpdateOrder
  | UpdateOrderSuccess
  | UpdateOrderFail
  | DeleteOrder
  | DeleteOrderSuccess
  | DeleteOrderFail
  | LoadOrders
  | LoadOrdersSuccess
  | LoadOrdersFail
  | LoadOrder
  | LoadOrderSuccess
  | LoadOrderFail;
