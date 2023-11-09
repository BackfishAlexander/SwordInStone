import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const payload = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:8080/register', payload, { responseType: 'text' }).subscribe(response => {
      console.log('Registration successful!', response);
      document.write("successfully registered account " + this.username);
    }, error => {
      console.error('Registration failed:', error);
      document.write("fialed to register account " + this.username);
    });
  }
}
