import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class NotificationService {

  notification: BehaviorSubject<string> = new BehaviorSubject(null);
  readonly notification$: Observable<string> = this.notification.asObservable();

  constructor() {}

  notify(message) {
    this.notification.next(message);
    setTimeout(() => this.notification.next(null), 3000);
  }

}
