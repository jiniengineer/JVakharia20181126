import * as fromOrders from './order.reducer';
import * as fromActions from '../actions/order.action';
import { IOrder } from '../../models/order.model';
import { Update } from '@ngrx/entity';

describe('OrderReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromOrders;
      const action = {} as any;
      const state = fromOrders.orderReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_ORDERS action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromOrders;
      const action = new fromActions.LoadOrders();
      const state = fromOrders.orderReducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_ORDERS_SUCCESS action', () => {
    it('should populate the orders array', () => {
      const orders: IOrder[] = [
        { id: 1, merchantName: 'Merchant #1', itemName: '',
            price: 2.2, currencyType: 'BCH', invoiceAmount: 2.3 },
        { id: 2, merchantName: 'Merchant #2', itemName: '',
            price: 2, currencyType: 'BCH', invoiceAmount: 2.3 },
      ];
      const entities = {
        1: orders[0],
        2: orders[1],
      };
      const { initialState } = fromOrders;
      const action = new fromActions.LoadOrdersSuccess(orders);
      const state = fromOrders.orderReducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_ORDERS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromOrders;
      const action = new fromActions.LoadOrdersFail('');
      const state = fromOrders.orderReducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const { initialState } = fromOrders;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadOrdersFail('');
      const state = fromOrders.orderReducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE_ORDER_SUCCESS action', () => {
    it('should add the new IOrder to the IOrders array', () => {
      const orders: IOrder[] = [
          { id: 1, merchantName: 'Merchant #1', itemName: '',
              price: 2.2, currencyType: 'BCH', invoiceAmount: 2.3 },
          { id: 2, merchantName: 'Merchant #2', itemName: '',
              price: 2, currencyType: 'BCH', invoiceAmount: 2.3 },
        ];
      const newIOrder: IOrder = { id: 2, merchantName: 'Merchant #2', itemName: '',
          price: 2, currencyType: 'BCH', invoiceAmount: 2.3 };
      const entities = {
        1: orders[0],
        2: orders[1],
      };
      const { initialState } = fromOrders;
      const previousState = { ...initialState, entities };
      const action = new fromActions.CreateOrderSuccess(newIOrder);
      const state = fromOrders.orderReducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({ ...entities, 3: newIOrder });
    });
  });

  describe('UPDATE_ORDER_SUCCESS action', () => {
    it('should update the IOrder', () => {
      const orders: IOrder[] = [{ id: 1, merchantName: 'Merchant #1', itemName: '',
        price: 2.2, currencyType: 'BCH', invoiceAmount: 2.3 },
        { id: 2, merchantName: 'Merchant #2', itemName: '',
          price: 2, currencyType: 'BCH', invoiceAmount: 2.3 },
      ];
      // tslint:disable-next-line:max-line-length
      const updatedOrder: IOrder = {
        id: 2,
        merchantName: 'Updated Merchant# 2',
        itemName: '',
        price: 2,
        currencyType: 'BCH',
        invoiceAmount: 2.3 };
      const entities = {
        1: orders[0],
        2: orders[1],
      };
      const { initialState } = fromOrders;
      const previousState = { ...initialState, entities };

      // const action = new fromActions.UpdateOrderSuccess(new Update<updatedOrder>);
      // const state = fromOrders.orderReducer(previousState, action);

    //  expect(Object.keys(state.entities).length).toEqual(2);
    //  expect(state.entities).toEqual({ ...entities, 2: updatedOrder });
    });
  });

  describe('REMOVE_ORDER_SUCCESS action', () => {
    it('should remove the IOrder', () => {
      const orders: IOrder[] = [{ id: 1, merchantName: 'Merchant #1', itemName: '',
        price: 2.2, currencyType: 'BCH', invoiceAmount: 2.3 },
        { id: 2, merchantName: 'Merchant #2', itemName: '',
          price: 2, currencyType: 'BCH', invoiceAmount: 2.3 },
      ];
      const entities = {
        1: orders[0],
        2: orders[1],
      };
      const { initialState } = fromOrders;
      const previousState = { ...initialState, entities };
      const action = new fromActions.DeleteOrderSuccess(1);
      const state = fromOrders.orderReducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({ 2: orders[1] });
    });
  });
});
