import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IOrder } from '../../models/order.model';
import * as orderActions from '../actions/order.action';

export interface OrderState extends EntityState<IOrder> {
  selectedOrderId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const orderAdapter: EntityAdapter<IOrder> = createEntityAdapter<IOrder>();

export const defaultOrder: OrderState = {
  ids: [],
  entities: {},
  selectedOrderId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = orderAdapter.getInitialState(defaultOrder);

export function orderReducer(state = initialState,
                            action: orderActions.Action): OrderState {
  switch (action.type) {
    case orderActions.OrderActionTypes.LoadOrdersSuccess: {
      return orderAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case orderActions.OrderActionTypes.LoadOrdersFail: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case orderActions.OrderActionTypes.LoadOrderSuccess: {
      return orderAdapter.addOne(action.payload, {
        ...state,
        selectedOrderId: action.payload.id
      });
    }

    case orderActions.OrderActionTypes.LoadOrderFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    case orderActions.OrderActionTypes.CreateOrderSuccess: {
      return orderAdapter.addOne(action.payload, state);
    }

    case orderActions.OrderActionTypes.CreateOrderFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    case orderActions.OrderActionTypes.UpdateOrderSuccess: {
      return orderAdapter.updateOne(action.payload, state);
    }

    case orderActions.OrderActionTypes.UpdateOrderFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    case orderActions.OrderActionTypes.DeleteOrderSuccess: {
      return orderAdapter.removeOne(action.payload, state);
    }

    case orderActions.OrderActionTypes.DeleteOrderFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = orderAdapter.getSelectors();

export const getOrderEntities = (state: OrderState) => state.entities;
export const getOrdersLoading = (state: OrderState) => state.loading;
export const getOrdersLoaded = (state: OrderState) => state.loaded;


