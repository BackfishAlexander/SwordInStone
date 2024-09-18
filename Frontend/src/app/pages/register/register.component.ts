import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData = {
    username: '',
    password: '',
    agreeToTerms: false
  };
  loading = false;

  ngOnInit(): void {
      this.auth.logout(false);
  }

  constructor(
    private auth: AuthenticationService, 
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

   onSubmit() {
    this.loading = true;
    this.auth.register(this.registerData.username, this.registerData.password).subscribe(
      response => {
        this.loading = false;
        this.router.navigate(['/home']);
        // Handle successful login if needed
      },
      error => {
        this.loading = false;
        this.notificationService.showNotification("Error registering account.", "error");
        // Error is already handled in the service
      }
    );
  }
}
