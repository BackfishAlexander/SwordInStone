import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  dropdownOpen = false;
  loggedIn = false;

  constructor(private router: Router,
    private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.loggedIn = this.auth.isLoggedIn();

    this.auth.loginEvent.subscribe(success => {
      if (success) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    });
  }

  navigateToHome(): void {
      this.router.navigate(['/']);
  }

  navigateToLogout(): void {
    this.router.navigate(['/logout']);
}

  toggleDropdown(): void {
      this.dropdownOpen = !this.dropdownOpen;
  }
}

