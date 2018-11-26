import { Injectable, Injector} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Event, NavigationError } from '@angular/router';
import * as StackTraceParser from 'stacktrace-parser';
import { FakeHttpErrorService } from './http-logging.service';

@Injectable()
export class LoggingService {

  constructor(
    private injector: Injector,
    private router: Router
  ) {
    // Subscribe to the NavigationError
    this.router
      .events
      .subscribe((event: Event) => {
        if (event instanceof NavigationError) {
          // Redirect to the ErrorComponent
          this.log(event.error).subscribe((errorWithContext) => {
            this.router.navigate(['/error'], { queryParams: errorWithContext });
          });
        }
      });
  }

  log(error) {
    // Log the error to the console
    console.error(error);
    // Send error to server
    const errorToSend = this.addContextInfo(error);
    return FakeHttpErrorService.post(errorToSend);
  }

  addContextInfo(error) {
    // You can include context details here (usually coming from other services: UserService...)
    const name = error.name || null;
    const appId = 'BitPay';
    const user = 'Test';
    const time = new Date().getTime();
    const id = `${appId}-${user}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    console.log('Stack Trace: ', error.stack);
    const stack = error instanceof HttpErrorResponse
      ? null
      : (error.stack) ? StackTraceParser.parse(error.stack) : '';

    const errorWithContext = {name, appId, user, time, id, url, status, message, stack};
    return errorWithContext;
  }

}

