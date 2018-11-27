import * as fromCurrencyTypes from '../reducers/currencytype.reducer';
import { getCurrencyTypesLoading, getCurrencyTypesLoaded } from '../reducers/currencytype.reducer';
import { CurrencyType } from '../../models/currency-type';
import { getAllCurrencyTypes } from './currencytype.selectors';

describe('CurencyType Selectors', () => {
    describe('getAllCurrencyTypes', () => {
      it('should return orders', () => {
        const currencyTypes: CurrencyType[] = [
          { id: 1, name: 'BitCoin', symbol: 'BCH' },
          { id: 2, name: 'Etherem', symbol: 'ETH' },
        ];
        const { initialState } = fromCurrencyTypes;
        const previousState = { ...initialState, currencyTypes };
        const slice = getAllCurrencyTypes(previousState);
        expect(slice).toEqual(currencyTypes);
      });
    });

    describe('getFilteredCurrencies', () => {
        it('should return all currency types', () => {
          const currencyTypes: CurrencyType[] = [
            { id: 1, name: 'BitCoin', symbol: 'BCH' },
            { id: 1027, name: 'Etherem', symbol: 'ETH' },
            { id: 1831, name: 'BitCoin Cash', symbol: 'LTE'},
            { id: 8071, name: 'RoundCoin', symbol: 'RTE'}
          ];
          const { initialState } = fromCurrencyTypes;
          const previousState = { ...initialState, currencyTypes };
          const slice = getAllCurrencyTypes(previousState);
          expect(slice).toEqual([{ id: 1, name: 'BitCoin', symbol: 'BCH' },
          { id: 1027, name: 'Etherem', symbol: 'ETH' },
          { id: 1831, name: 'BitCoin Cash', symbol: 'LTE'}]);
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
