import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { CurrencyType } from '../../models/currency-type';
import * as currencyTypeActions from '../actions/currencytype.action';

export interface CurrencyTypesState extends EntityState<CurrencyType> {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const currencyTypesAdapter: EntityAdapter<CurrencyType>
  = createEntityAdapter<CurrencyType>();

export const defaultCurrencyType: CurrencyTypesState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = currencyTypesAdapter.getInitialState(defaultCurrencyType);

export function currencyTypesReducer(state = initialState,
  action: currencyTypeActions.CurrencyAction): CurrencyTypesState {

  switch (action.type) {

    case currencyTypeActions.CurrencyActionTypes.LoadCurrencyTypesSuccess: {
      return currencyTypesAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    /*case currencyTypeActions.CurrencyActionTypes.LoadCurrencyTypesFail: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }*/

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
} = currencyTypesAdapter.getSelectors();

export const getCurrencyTypeEntities = (state: CurrencyTypesState) =>
    state && state.entities ? state.entities : {};
export const getCurrencyTypesLoading = (state: CurrencyTypesState) => state.loading;
export const getCurrencyTypesLoaded = (state: CurrencyTypesState) => state.loaded;


