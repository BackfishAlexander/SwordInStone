import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';  // Assuming you're using ngx-cookie-service to handle cookies
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  username: string | null = "";
  userId: string | null = "";
  campaigns: {name: string, description: string, id: string, ownerId: string}[] = [];

  showModal: boolean = false;
  campaign = {
    campaignName: '',
    campaignDescription: '',
    username: '',
    id: '',
    ownerId: '',
  };

  fetchCampaigns() {
    this.http.get<{ [key: string]: { name: string; description: string; ownerId: string;} }>(`http://` + this.auth.getBackendIP() + `:8080/private/campaign/list`, { headers: this.auth.getHeaders() })
      .subscribe(response => {
        this.campaigns = Object.entries(response).map(([id, { name, description, ownerId }]) => ({
          id,
          name,
          description,
          ownerId
        }));

        console.log(this.campaigns);
      }, error => {
        console.error('Failed to fetch campaigns', error);
        if (error.status == 403) {
          this.auth.logout();
        }
        else {
          this.notificationService.show('Failed to load home page', 'error');
        }
      });
  }

  goToCampaign(campaignId: string) {
    this.router.navigate(['/campaign', campaignId]);
  }

  deleteCampaign(campaignId: String) {
    if (confirm("Are you sure you want to delete this campaign?")) {
      this.auth.deleteRequest("/private/campaign/delete/" + campaignId).then(success => {
        if (success) {
          console.log('Campaign deleted successfully');
          this.fetchCampaigns();
        } else {
          console.log('Delete failed');
          // Handle login failure
        }
      }).catch(error => {
        console.error('An error occurred during login', error);
        // Handle the error
      });
  }
  }

  leaveCampaign(campaignId: String) {
    if (confirm("Are you sure you want to leave this campaign?")) {
      this.auth.deleteRequest("/private/campaign/leave/" + campaignId).then(success => {
        if (success) {
          console.log('Campaign left successfully');
          this.fetchCampaigns();
        } else {
          this.notificationService.show('Failed to leave campaign', 'error');
          // Handle login failure
        }
      }).catch(error => {
        console.error('An error occurred during login', error);
        this.notificationService.show('Failed to leave campaign', 'error');
        // Handle the error
      });
  }
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
    this.http.post('http://' + this.auth.getBackendIP() + ':8080/private/campaign/add', this.campaign, { headers: this.auth.getHeaders(), responseType: 'text' })
      .subscribe(response => {
        this.fetchCampaigns();
      }, error => {
        if (error.status == 403) {
          console.log(error);
          // this.auth.logout();
        }
      });
    this.closeModal();
  }
  
  constructor(private cookieService: CookieService, 
    private router: Router, 
    private http: HttpClient,
     private auth: AuthenticationService,
     private notificationService: NotificationService) {
  }

  

  ngOnInit() {
    this.username = this.auth.getUsername();
    this.userId = this.auth.getId();

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.fetchCampaigns();
  }
}
