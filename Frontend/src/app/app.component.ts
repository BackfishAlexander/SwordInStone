import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';  // Assuming you're using ngx-cookie-service to handle cookies

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Sword and Stone";
  username: string | null = null;

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit() {
    this.username = this.cookieService.get('username') || null;
    if (this.username == null) {
      console.log("REDIRECTING TO LOGIN");
      this.router.navigate(['/login']);
    }
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }
}
