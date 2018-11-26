import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
// import { ServerErrorsInterceptor } from './server-errors.interceptor';
import { ErrorRoutingModule } from './error.routing.module';
import { ErrorComponent } from './components/error.component';
import { NotificationService } from './services/notification/notification.service';
import { LoggingService } from './services/logging/logging.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorRoutingModule,
  ],
  declarations: [
    ErrorComponent
  ],
  providers: [
    LoggingService,
    NotificationService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ]
})
export class ErrorModule { }

