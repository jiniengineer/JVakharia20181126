import * as fromCurrencyTypes from '../reducers/currencytype.reducer';
import { getCurrencyTypesLoading, getCurrencyTypesLoaded } from '../reducers/currencytype.reducer';
import { ICurrencyType } from '../../models/currency-type';
import { getAllCurrencyTypes } from './currencytype.selectors';

describe('CurencyType Selectors', () => {
    describe('getAllCurrencyTypes', () => {
      it('should return orders', () => {
        const currencyTypes: ICurrencyType[] = [
          { name: 'BitCoin', symbol: 'BCH' },
          { name: 'Etherem', symbol: 'ETH' },
        ];
        const { initialState } = fromCurrencyTypes;
        const previousState = { ...initialState, currencyTypes };
        const slice = getAllCurrencyTypes(previousState);
        expect(slice).toEqual(currencyTypes);
      });
    });

    describe('getFilteredData', () => {
        it('should return filtered and sorted data', () => {
          const currencyTypes: ICurrencyType[] = [
            { name: 'BitCoin', symbol: 'BCH' },
            { name: 'Etherem', symbol: 'ETH' },
            { name: 'LiteCoin', symbol: 'LTE'},
            { name: 'RoundCoin', symbol: 'RTE'}
          ];
          const { initialState } = fromCurrencyTypes;
          const previousState = { ...initialState, currencyTypes };
          const slice = getAllCurrencyTypes(previousState);
          expect(slice).toEqual(currencyTypes);
        });
      });

    describe('getCurrencyTypesLoading', () => {
      it('should return .loading', () => {
        const { initialState } = fromCurrencyTypes;
        const previousState = { ...initialState, loading: true };
        const slice = getCurrencyTypesLoading(previousState);

        expect(slice).toEqual(true);
      });
    });

    describe('getCurrencyTypesLoaded', () => {
      it('should return .loaded', () => {
        const { initialState } = fromCurrencyTypes;
        const previousState = { ...initialState, loaded: true };
        const slice = getCurrencyTypesLoaded(previousState);
        expect(slice).toEqual(true);
      });
    });
  });
