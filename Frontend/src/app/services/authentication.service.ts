import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { endpointList } from 'src/environments/endpoint-list';
import { HttpService } from './http.service';


interface ExtendedJwtPayload extends JwtPayload {
  username?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  login(username: string, password: string): Observable<{access_token: string}> {
    return this.http.post<{access_token: string}>(this.httpService.buildURL(endpointList.login), this.generatePayload(username, password), { responseType: 'json' })
      .pipe(
        tap(response => {
          localStorage.setItem('jwt-token', response.access_token);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  register(username: string, password: string): Observable<{access_token: string}> {
    return this.http.post<{access_token: string}>(this.httpService.buildURL(endpointList.register), this.generatePayload(username, password), { responseType: 'json' })
      .pipe(
        tap(response => {
          localStorage.setItem('jwt-token', response.access_token);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('jwt-token');
    if (token == null) {
      return false;
    }
    if (this.isTokenExpired(token)) {
      localStorage.removeItem('jwt-token');
      return false;
    }
    return true;
  }

  logout(navigate = true) {
    localStorage.removeItem('jwt-token');
    if (navigate) {
      this.router.navigate(['/']);
    }
  }

  generatePayload(username: String, password: String) {
    return ({
      username: username,
      password: password,
            })
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      const now = Date.now().valueOf() / 1000;

      if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
        return true;
      }
      return false;
    } catch (e) {
      return true; // Invalid token
    }
  }

  getUsername() {
    let uname = this.getUsernameFromToken(localStorage.getItem('jwt-token'));
    if (uname == null) {
      this.logout();
      return "";
    }
    else {
      return uname;
    }
  }

  getRole() {
    let role = this.getRoleFromToken(localStorage.getItem('jwt-token'));
    if (role == null) {
      this.logout();
      return "";
    }
    else {
      return role;
    }
  }

  private getUsernameFromToken(token: string | null): string | null {
    if (!token) return null;

    try {
      const decoded: ExtendedJwtPayload = jwtDecode(token);
      return decoded.username || null;
    } catch (e) {
      return null; // Invalid token
    }
  }

  private getRoleFromToken(token: string | null): string | null {
    if (!token) return null;

    try {
      const decoded: ExtendedJwtPayload = jwtDecode(token);
      return decoded.role || null;
    } catch (e) {
      return null; // Invalid token
    }
  }

  getId() {
    let id = this.getIdFromToken(localStorage.getItem('jwt-token'));
    if (id == null) {
      this.logout();
      return "";
    }
    else {
      return id;
    }
  }

  getIdFromToken(token: string | null): string | null {
    if (!token) return null;

    try {
      const decoded: ExtendedJwtPayload = jwtDecode(token);
      return decoded.sub || null;
    } catch (e) {
      return null; // Invalid token
    }
  }

  constructor(private http: HttpClient, private notificationService: NotificationService, private router: Router, private httpService: HttpService) { }
}
