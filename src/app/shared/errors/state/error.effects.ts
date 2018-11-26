import { LoadGlobalError, ErrorActionTypes } from './error.actions';
import { of } from 'rxjs';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

export class ErrorEffects {

  @Effect()
  onError$ = this.actions$.pipe(
    ofType<LoadGlobalError>(ErrorActionTypes.LoadGlobalError),
    switchMap((error: LoadGlobalError) => {
      // ... you can check the payload here to show different messages
      // like if error.statusCode === 501 etc.
      this.toastrService.error('Error', 'Ok');

      // remap to noop Action if no state needs to be updated.
      // or for example on 401 Errors dispach a re-login action etc.

      return of({ type: 'noop' });
    })
  );

  constructor(
    private actions$: Actions,
    private toastrService: ToastrService
  ) { }

}
