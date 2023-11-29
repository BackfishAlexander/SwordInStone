import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private createUrl = 'http://localhost:8080/private/character/create';

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  createCharacter(characterData: any): Observable<any> {
    console.log("CREATING CHARACTER... HERE ARE MY HEADERS: ");
    return this.http.post(this.createUrl, characterData , { headers: this.auth.getHeaders() });
  }
}

