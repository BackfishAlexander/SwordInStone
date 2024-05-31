import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private notification: NotificationService) {

  }

  callNotification() {
    this.notification.showNotification("Error! You messed something up!", "error");
  }
}
