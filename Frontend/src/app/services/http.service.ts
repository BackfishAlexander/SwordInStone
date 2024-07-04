import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  postRequest<T>(url: string, payload: any, responseType: any): Promise<T> 
  {
    return new Promise((resolve, reject) => {
      this.http.post<T>(url, payload, { responseType: responseType })
        .subscribe(response => {
          
          resolve(response);
        }, error => {

          reject(false);
        });
    });
  }

  getRequest<T>(url: string, responseType: 'json'): Promise<T>
  {
    return new Promise((resolve, reject) => {
      this.http.get<T>(url, { responseType: responseType })
        .subscribe(response => {

          resolve(response);
        }, error => {

          reject(false);
        });
    });
  }

  deleteRequest<T>(url: string, responseType: 'json'): Promise<T>
  {
    return new Promise((resolve, reject) => {
      this.http.delete<T>(url, { responseType: responseType })
        .subscribe(response => {

          resolve(response);
        }, error => {

          reject(false);
        });
    });
  }

  buildURL(url: string) {
    let result = "";
    if (environment.apiSSL) {
      result += "https://";
    }
    else {
      result += "http://";
    }
    result += environment.apiUrl;
    // result += ":" + environment.apiPort;
    result += url;
    return result;
  }

  constructor(private http: HttpClient) { }
}
