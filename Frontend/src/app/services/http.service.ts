import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  postRequest(url: string, payload: any, responseType: any): Promise<boolean> 
  {
    return new Promise((resolve, reject) => {
      this.http.post<String>(url, payload, { responseType: responseType })
        .subscribe(response => {
          // console.log('Login successful!', response);
          // this.setToken(response.token);
          // this.loginEvent.emit(true);
          resolve(true);
        }, error => {
          console.error('Login failed!', error);
          reject(false);
        });
    });
  }

  getRequest<T>(url: string, responseType: 'json'): Promise<T>
  {
    return new Promise((resolve, reject) => {
      this.http.get<T>(url, { responseType: responseType })
        .subscribe(response => {
          // console.log('Login successful!', response);
          // this.setToken(response.token);
          // this.loginEvent.emit(true);
          resolve(response);
        }, error => {
          // console.error('Login failed!', error);
          reject(false);
        });
    });
  }

  constructor(private http: HttpClient) { }
}
