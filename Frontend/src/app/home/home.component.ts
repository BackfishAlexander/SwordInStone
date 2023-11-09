import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';  // Assuming you're using ngx-cookie-service to handle cookies
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  username: string | null = null;
  campaigns: {name: string, description: string, id: string}[] = [];

  showModal: boolean = false;
  campaign = {
    campaignName: '',
    campaignDescription: '',
    username: '',
    id: ''
  };

  fetchCampaigns() {
    const username = this.cookieService.get('username');
    this.http.get<{ [key: string]: { name: string; description: string } }>(`http://localhost:8080/private/campaign/list?username=${username}`)
      .subscribe(response => {
        this.campaigns = Object.entries(response).map(([id, { name, description }]) => ({
          id,
          name,
          description
        }));
      }, error => {
        console.error('Failed to fetch campaigns', error);
      });
  }

  goToCampaign(campaignId: string) {
    this.router.navigate(['/campaign', campaignId]);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitCampaign() {
    this.campaign.username = this.cookieService.get('username');
    // Implement submission logic here
    console.log('Campaign Submitted:', this.campaign);
    this.http.post('http://localhost:8080/private/campaign/add', this.campaign, { responseType: 'text' })
      .subscribe(response => {
        this.fetchCampaigns();
      }, error => {
        document.write("campaign failed to add " + this.campaign.campaignName);
      });
    this.closeModal();
  }
  
  constructor(private cookieService: CookieService, private router: Router, private http: HttpClient) {
  }

  

  ngOnInit() {
    this.username = this.cookieService.get('username') || null;
    if (this.username == null) {
      this.router.navigate(['/login']);
    }

    this.fetchCampaigns();
  }
}
