import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromOrders from './order.reducer';
import * as fromCurrencyTypes from './currencytype.reducer';

export interface OrderModuleState {
  orders: fromOrders.OrderState;
  currencyTypes: fromCurrencyTypes.CurrencyTypesState;
}

export const reducers: ActionReducerMap<OrderModuleState> = {
  orders: fromOrders.orderReducer,
  currencyTypes: fromCurrencyTypes.currencyTypesReducer,
};

export const getOrderModuleState = createFeatureSelector<OrderModuleState>('orderModule');


