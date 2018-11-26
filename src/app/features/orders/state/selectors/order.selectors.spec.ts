import * as fromOrders from '../reducers/order.reducer';
import { getOrdersLoading, getOrdersLoaded, getAllOrders } from './order.selectors';
import { IOrder } from '../../models/order.model';

describe('OrdersReducer Selectors', () => {
    describe('getAllOrders', () => {
      it('should return orders', () => {
        const orders: IOrder[] = [
          { id: 1, merchantName: 'Merchant #1', itemName: '',
          price: 2.2, currencyType: 'BCH', invoiceAmount: 2.3 },
          { id: 2, merchantName: 'Merchant #2', itemName: '',
            price: 2, currencyType: 'BCH', invoiceAmount: 2.3 }
        ];
        const { initialState } = fromOrders;
        const previousState = { ...initialState, orders };
        const slice = getAllOrders(previousState);
        expect(slice).toEqual(orders);
      });
    });

    describe('getOrdersLoading', () => {
      it('should return .loading', () => {
        const { initialState } = fromOrders;
        const previousState = { ...initialState, loading: true };
        const slice = getOrdersLoading(previousState);

        expect(slice).toEqual(true);
      });
    });

    describe('getOrdersLoaded', () => {
      it('should return .loaded', () => {
        const { initialState } = fromOrders;
        const previousState = { ...initialState, loaded: true };
        const slice = getOrdersLoaded(previousState);
        expect(slice).toEqual(true);
      });
    });
  });
