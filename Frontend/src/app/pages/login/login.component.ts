import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  };
  loading = false;

  constructor(
    private auth: AuthenticationService, 
    private router: Router, 
    private notificationService: NotificationService
  ) {
    
  }

  ngOnInit(): void {
    this.auth.logout(false);
  }

  onSubmit() {
    this.loading = true;
    this.auth.login(this.loginData.username, this.loginData.password).subscribe(
      response => {
        this.loading = false;
        this.router.navigate(['/home']);
        // Handle successful login if needed
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification("Error logging in.", "error");
        // Error is already handled in the service
      }
    );
  }
}
