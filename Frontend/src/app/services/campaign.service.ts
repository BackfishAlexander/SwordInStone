import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private baseUrl = 'http://localhost:8080/private/campaign/view/';

  constructor(private http: HttpClient) {}

  getCampaign(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }
}
