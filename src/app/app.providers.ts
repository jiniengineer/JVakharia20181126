import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './reducers/index';
import { TransferState } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptorService } from './shared/services/http/interceptor.service';

export const APP_PROVIDERS = [
  { provide: RouterStateSerializer, useClass: CustomSerializer },
  TransferState,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptorService,
    multi: true
  },
];
