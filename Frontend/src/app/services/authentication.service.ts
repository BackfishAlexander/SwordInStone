import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { RegistrationResponse } from '../DTOs/RegistrationResponse';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: any;
  private headers: String = "";
  public loginEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
    private router: Router,
    ) {
  }

  getTokenDetails() {
    try {
      const decodedToken = jwtDecode(this.getToken());
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  login(username: String, password: String): Promise<boolean> {
    const payload = {
      username: username,
      password: password
    };
  
    return new Promise((resolve, reject) => {
      this.http.post<RegistrationResponse>('http://localhost:8080/login', payload, { responseType: 'json' })
        .subscribe(response => {
          console.log('Login successful!', response);
          this.setToken(response.token);
          this.loginEvent.emit(true);
          resolve(true);
        }, error => {
          console.error('Login failed!', error);
          reject(false);
        });
    });
  }

  
  register(username: String, password: String) {
    const payload = {
      username: username,
      password: password
    };

    return new Promise((resolve, reject) => { this.http.post<RegistrationResponse>('http://localhost:8080/register', payload, { responseType: 'json' }).subscribe(response => {
      console.log('Registration successful!', response);
        this.setToken(response.token);
        this.loginEvent.emit(true);
        resolve(true);
      }, error => {
        console.error('Registration failed!', error);
        reject(false);
      });
    });
  } 

  public getToken() {
    let token = localStorage.getItem('token');
    if (typeof token === 'string') {
      return token
    }
    else {
      return "";
    }
  }

  public getUsername(): string {
    let details = this.getTokenDetails();
    if (details != null) {
      let u = details.sub;
      if (u != undefined) {
        return u;
      }
    }
    return "";
  }

  public isLoggedIn() {
    return this.getToken() !== ""
  }

  public logout() {
    this.setToken("");
    this.loginEvent.emit(false);
    this.router.navigate(['/login']);
  }

  private setToken(token: any) {
    localStorage.setItem('token',token);
  }

  public getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }
}
