/* tslint:disable: max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import 'rxjs/add/operator/takeUntil';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
        RouterTestingModule.withRoutes(routes)
        ],
      providers: [],
      declarations: [
        AppComponent,
        NavbarComponent ]
    });
  });

  it('should contain app text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toContainText('Angular Starter App');
  }));

});
