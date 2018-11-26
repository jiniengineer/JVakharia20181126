import { Action } from '@ngrx/store';
import { ICurrencyType } from '../../models/currency-type';

export enum CurrencyActionTypes {
  LoadCurrencyTypes = '[CurrencyTypes] Load',
  LoadCurrencyTypesSuccess = '[CurrencyTypes] Load Success'
}

export class LoadCurrencyTypes implements Action {
  readonly type = CurrencyActionTypes.LoadCurrencyTypes;
}

export class LoadCurrencyTypesSuccess implements Action {
  readonly type = CurrencyActionTypes.LoadCurrencyTypesSuccess;

  constructor(public payload: ICurrencyType[]) {}
}

export type CurrencyAction =
  | LoadCurrencyTypes
  | LoadCurrencyTypesSuccess;
