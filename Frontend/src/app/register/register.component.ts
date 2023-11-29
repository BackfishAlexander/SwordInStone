import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private auth: AuthenticationService,
    private router: Router) {}

  onSubmit() {
    this.auth.register(this.username, this.password).then(success => {
      if (success) {
        console.log('Logged in successfully');
        this.router.navigate(['/']);
      } else {
        console.log('Login failed');
        // Handle login failure
      }
    }).catch(error => {
      console.error('An error occurred during login', error);
      // Handle the error
    });
   }
  }
