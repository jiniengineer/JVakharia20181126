import { Action } from '@ngrx/store';

export const LOAD_GLOBAL_ERROR = '[GlobalError] Load Error';

export enum ErrorActionTypes {
  LoadGlobalError = '[Error] Load Error'
}

export class LoadGlobalError implements Action {
  readonly type = LOAD_GLOBAL_ERROR;
  constructor(public payload: any) {}
}

export type All =
  | LoadGlobalError;

