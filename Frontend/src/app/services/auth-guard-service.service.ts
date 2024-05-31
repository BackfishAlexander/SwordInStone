import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate {

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigate(['/landing']);
      return false;
    }
  }

  constructor(private auth: AuthenticationService, private router: Router) { }
}
