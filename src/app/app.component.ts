import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { views } from './app-nav-views';
import { MOBILE } from './shared/services/constants';

import * as fromRoot from './reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  mobile = MOBILE;
  views = views;
  error$: Observable<any>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public store: Store<fromRoot.AppState>
  ) {
    this.error$ = store.pipe(select('error'));
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
