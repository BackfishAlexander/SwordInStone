import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private baseUrl = 'http://' + this.auth.getBackendIP() + ':8080/private/campaign/view/';
  private playerCList = 'http://' + this.auth.getBackendIP() + ':8080/private/user/playerlist/';

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  getCampaign(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`, { headers: this.auth.getHeaders() });
  }
  
  getUserPlayers(): Observable<any> {
    return this.http.get(`${this.playerCList}`, { headers: this.auth.getHeaders() });
  }
}
