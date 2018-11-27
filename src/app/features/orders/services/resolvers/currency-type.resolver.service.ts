import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  LoadCurrencyTypes,
  OrderModuleState,
  getFilteredCurrencies } from '../../state';
import { tap, filter, take } from 'rxjs/operators';
import { ICurrencyType } from '../../models/currency-type';

@Injectable({
  providedIn: 'root'
})

export class CurrencyTypesResolver implements Resolve<ICurrencyType[]> {

  constructor(private store: Store<OrderModuleState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICurrencyType[]> {
    return this.store
      .pipe(
        select(getFilteredCurrencies),
        tap(currencyTypes => {
          if (!currencyTypes || currencyTypes.length === 0) {
            this.store.dispatch(new LoadCurrencyTypes());
          }
        }),
        filter((data: any) => data.length), // filter out data if length is empty
        take(1)
      );
    }
}
