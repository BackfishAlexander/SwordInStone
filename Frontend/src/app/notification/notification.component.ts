import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifications.subscribe((notification: Notification) => {
      this.notifications.push(notification);

      if (notification.duration) {
        setTimeout(() => this.close(notification), notification.duration);
      }
    });
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
