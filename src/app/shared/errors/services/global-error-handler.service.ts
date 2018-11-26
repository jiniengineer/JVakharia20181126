import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoggingService } from './logging/logging.service';
import { NotificationService } from './notification/notification.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  static readonly DEFAULT_ERROR_MESSAGE: string
      = 'An error occurred while processing your request. Please try again';
  static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';

  constructor(
    private injector: Injector,
    private toastr: ToastrService,
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    const notificationService = this.injector.get(NotificationService);
    const loggingService = this.injector.get(LoggingService);
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
    // Server error happened
      if (!navigator.onLine) {
        // No Internet connection
        return notificationService.notify('No Internet Connection');
      }
      // Http Error
      // Send the error to the server
      loggingService.log(error).subscribe();
      const httpErrorCode = error.error.httpErrorCode;
      console.log('Global Error handling - Http Error Code:' + httpErrorCode);

      switch (httpErrorCode) {
        case 401:
            router.navigateByUrl('/login');
            break;
        case 403:
            router.navigateByUrl('/unauthorized');
            break;
        case 400:
        case 404:
          router.navigate(['/error']);
            break;
        default:
          this.showError();
      }
      // Show notification to the user
      // return notificationService.notify(`${error.status} - ${error.message}`);
    } else {
      // Client Error Happend
      // Send the error to the server and then
      // redirect the user to the page with all the info or display generic error message
      loggingService
        .log(error)
        .subscribe(() => {
          router.navigate(['/error']);
        });
    }
  }

  private showError() {
    this.toastr.error(GlobalErrorHandlerService.DEFAULT_ERROR_MESSAGE,
      GlobalErrorHandlerService.DEFAULT_ERROR_TITLE);
  }
}
