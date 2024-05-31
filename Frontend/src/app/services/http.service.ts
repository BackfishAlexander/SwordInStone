import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  postRequest(url: String, payload: any, responseType: String) {
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

  constructor(private router: Router) { }
}
