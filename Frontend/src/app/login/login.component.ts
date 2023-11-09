import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

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
    const credentials = {
      username: this.username,
      password: this.password
    };

    console.log(credentials);

    this.http.post('http://localhost:8080/login', credentials, { responseType: 'text' })
      .subscribe(response => {
        this.setCookie('username', this.username, 7);
        document.write("Logged in with " + this.username);
      }, error => {
        document.write("Error logging in");
      });
  }
}
