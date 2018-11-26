import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { CryptoService } from '../../services/crypto.service';
import { ICurrencyType } from '../../models/currency-type';
import {
  CurrencyActionTypes,
  LoadCurrencyTypesSuccess,
  LoadCurrencyTypes } from '../actions/currencytype.action';
import { LoadGlobalError } from '../../../../shared/errors/state/error.actions';

@Injectable()

export class CurrencyTypesEffects {

  @Effect()
  getCurrencyTypes$: Observable<Action> = this.actions$.pipe(
    ofType<LoadCurrencyTypes>(CurrencyActionTypes.LoadCurrencyTypes),
    switchMap(() =>
      this.cryptoService.getCurrencyListings().pipe(
        map((currencyTypes: ICurrencyType[]) => {
          // console.log('Currency Types: ', currencyTypes);
          return new LoadCurrencyTypesSuccess(currencyTypes);
        }),
        catchError(err => of(new LoadGlobalError(err)))
      )
    )
  );

  /*@Effect()
  getCurrencyPrice$: Observable<Action> = this.actions$.pipe(
    ofType<LoadCryptoPrice>(CurrencyActionTypes.LoadCryptoPrice),
    map((action: LoadCryptoPrice) => action.payload),
    switchMap((id: string) =>
      this.cryptoService.getCryptoPrice(id).pipe(
        map((price: number) => new LoadCryptoPriceSuccess(price)),
        catchError(err => of(new LoadGlobalError(err)))
      )
    )
  );*/

  constructor(
    private actions$: Actions,
    private cryptoService: CryptoService
  ) { }

}

