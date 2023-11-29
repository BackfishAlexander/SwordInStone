import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';  // Assuming you're using ngx-cookie-service to handle cookies
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  username: string | null = "";
  campaigns: {name: string, description: string, id: string}[] = [];

  showModal: boolean = false;
  campaign = {
    campaignName: '',
    campaignDescription: '',
    username: '',
    id: ''
  };

  fetchCampaigns() {
    this.http.get<{ [key: string]: { name: string; description: string; } }>(`http://localhost:8080/private/campaign/list`, { headers: this.auth.getHeaders() })
      .subscribe(response => {
        this.campaigns = Object.entries(response).map(([id, { name, description }]) => ({
          id,
          name,
          description
        }));
      }, error => {
        console.error('Failed to fetch campaigns', error);
        if (error.status == 403) {
          this.auth.logout();
        }
      });
  }

  goToCampaign(campaignId: string) {
    this.router.navigate(['/campaign', campaignId]);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    console.log("CLOSING THE MODAL!!!!");
    this.showModal = false;
  }

  submitCampaign() {
    // Implement submission logic here
    console.log('Campaign Submitted:', this.campaign);
    this.http.post('http://localhost:8080/private/campaign/add', this.campaign, { headers: this.auth.getHeaders(), responseType: 'text' })
      .subscribe(response => {
        this.fetchCampaigns();
      }, error => {
        if (error.status == 403) {
          this.auth.logout();
        }
      });
    this.closeModal();
  }
  
  constructor(private cookieService: CookieService, 
    private router: Router, 
    private http: HttpClient,
     private auth: AuthenticationService) {
  }

  

  ngOnInit() {
    this.username = this.auth.getUsername();

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.fetchCampaigns();
  }
}
