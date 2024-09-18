// notification.service.ts
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications = new ReplaySubject<Notification | null>(1);
  notifications$: Observable<Notification | null> = this._notifications.asObservable();

  showNotification(message: string, type: 'info' | 'success' | 'warning' | 'error', forever = false) {
    this._notifications.next({ message, type });
    
    if (forever == false) {
      setTimeout(() => {
        this._notifications.next(null);
      }, 5000); // Hide notification after 5 seconds
    }
  }
}
