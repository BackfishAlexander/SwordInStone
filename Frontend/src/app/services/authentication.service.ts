import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { RegistrationResponse } from '../DTOs/RegistrationResponse';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  sub: string;  // Standard JWT fields
  // ... other standard fields you might use
  userId: string;  // Your custom field
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private backendIP: String = "192.168.68.105";
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
      console.log(decodedToken);
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
      this.http.post<RegistrationResponse>('http://' + this.getBackendIP() + ':8080/login', payload, { responseType: 'json' })
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

    return new Promise((resolve, reject) => { this.http.post<RegistrationResponse>('http://' + this.getBackendIP() + ':8080/register', payload, { responseType: 'json' }).subscribe(response => {
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

  deleteRequest(URL: String) {
    if (!URL.startsWith("/")) {
      URL = "/" + URL;
    }

    return new Promise((resolve, reject) => { this.http.delete('http://' + this.getBackendIP() + ':8080' + URL, { headers: this.getHeaders(), responseType: 'json'}).subscribe(response => {
        console.log('Delete Request successful!', response);
        resolve(true);
      }, error => {
        console.error('Delete failed!', error);
        reject(false);
      });
    });
  }

  postRequest(URL: String, payload: any) {
    if (!URL.startsWith("/")) {
      URL = "/" + URL;
    }

    return new Promise((resolve, reject) => { this.http.post('http://' + this.getBackendIP() + ':8080' + URL, payload, { headers: this.getHeaders(), responseType: 'text'}).subscribe(response => {
        console.log('Post Request successful!', response);
        resolve(true);
      }, error => {
        console.error('Post Request failed!', error);
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

  public getId(): string {
    let details = this.getTokenDetails();
    if (details != null) {
      let customDetails = details as CustomJwtPayload; // Type assertion
      let userId = customDetails.userId;
      if (userId !== undefined) {
        return userId;
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

  public getBackendIP() {
    return this.backendIP;
  }
}
