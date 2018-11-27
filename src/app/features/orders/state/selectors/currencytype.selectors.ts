import { createSelector } from '@ngrx/store';
import { CurrencyType } from '../../models/currency-type';
import { getOrderModuleState, OrderModuleState } from '../reducers';
import * as fromCurrencyTypes from '../reducers/currencytype.reducer';

export const getCurrencyTypesState = createSelector(
  getOrderModuleState,
  (state: OrderModuleState) => state.currencyTypes
);

export const getAllCurrencyTypes = createSelector(
  getCurrencyTypesState,
  fromCurrencyTypes.selectAll
);

export const getFilteredCurrencies = createSelector(
  getAllCurrencyTypes,
  (currencyTypes: CurrencyType[]) => {
    const types = currencyTypes.filter(currency =>
            (currency.symbol === 'BTC'
          || currency.symbol === 'BCH'
          || currency.symbol === 'ETH')
    );
    return types.sort((a, b) => a.name < b.name ? -1 : 1);
  }
);

export const getCurrencyTypesLoading = createSelector(
  getCurrencyTypesState,
  fromCurrencyTypes.getCurrencyTypesLoading
);

export const getCurrencyTypesLoaded = createSelector(
  getCurrencyTypesState,
  fromCurrencyTypes.getCurrencyTypesLoaded
);

export const getCurrencyTypesError = createSelector(
  getCurrencyTypesState,
  (state: fromCurrencyTypes.CurrencyTypesState) => state.error
);

