import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private createUrl = 'http://localhost:8080/private/character/create';

  constructor(private http: HttpClient) {}

  createCharacter(characterData: any): Observable<any> {
    return this.http.post(this.createUrl, characterData);
  }
}

