import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  generatePayload(username: String, password: String) {
    return ({
      username: username,
      password: password,
            })
  }

  constructor() { }
}
