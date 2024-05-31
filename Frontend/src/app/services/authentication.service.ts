import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  login(username: string, password: string) {
    this.http.post('http://localhost:8080/login', this.generatePayload(username, password), { responseType: 'text' })
      .subscribe(response => {
        document.write("Logged in with " + username + " " + response);
      }, error => {
        document.write(JSON.stringify(error));
      });
  }

  register(username: string, password: string) {
    this.http.post('http://localhost:8080/register', this.generatePayload(username, password), { responseType: 'text' })
    .subscribe(response => {
      document.write("successfully registered account " + username + " " + response);
    }, error => {
      console.error('Registration failed:', error);
      document.write("fialed to register account " + username);
    });
  }  

  isAuthenticated(): boolean {
    return true;
  }

  generatePayload(username: String, password: String) {
    return ({
      username: username,
      password: password,
            })
  }

  constructor(private http: HttpClient) { }
}
