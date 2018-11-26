import { createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/order.reducer';
import { getOrderModuleState, OrderModuleState } from '../reducers';

export const getOrdersState = createSelector(
  getOrderModuleState,
  (state: OrderModuleState) => state.orders
);

export const getAllOrders = createSelector(
  getOrdersState,
  fromOrders.selectAll
);

export const getOrderById = (orderId: number) => createSelector(
  getOrdersState,
  ordersState => ordersState.entities[orderId]
);

export const getOrdersLoading = createSelector(
  getOrdersState,
  fromOrders.getOrdersLoading
);

export const getOrdersLoaded = createSelector(
  getOrdersState,
  fromOrders.getOrdersLoaded
);

export const getError = createSelector(
  getOrdersState,
  (state: fromOrders.OrderState) => state.error
);

