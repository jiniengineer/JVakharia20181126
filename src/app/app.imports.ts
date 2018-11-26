import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DEV_REDUCERS, syncReducers, resetOnLogout, AppState } from './reducers';
import { RouterEffects } from './effects/router';
import { OrderEffects, CurrencyTypesEffects } from './features/orders/state/effects';

import { ErrorModule } from './shared/errors/error.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from './shared/services/fake-backend-service';

export const metaReducers: MetaReducer<AppState>[] = ENV === 'development' ?
  [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  BrowserAnimationsModule,
  EffectsModule.forRoot([
    RouterEffects,
    OrderEffects,
    CurrencyTypesEffects
  ]),
  ToastrModule.forRoot({
    preventDuplicates: true
  }),
  NgbModule.forRoot(),
  Ng4LoadingSpinnerModule.forRoot(),
  InMemoryWebApiModule.forRoot(FakeBackendService, {
    passThruUnknownUrl: true
  }),
  FormsModule,
  ReactiveFormsModule,
  ErrorModule,
  StoreModule.forRoot(syncReducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({
    stateKey: 'router' // name of reducer key
  }),
];
