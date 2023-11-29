import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, 
    private router: Router,
    private auth: AuthenticationService) {}

  setCookie(name: string, value: string, days: number): void {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    console.log("BUTTON CLICKED!")
    this.auth.login(this.username, this.password).then(success => {
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
