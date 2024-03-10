import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-campaign-join',
  templateUrl: './campaign-join.component.html',
  styleUrls: ['./campaign-join.component.css']
})
export class CampaignJoinComponent implements OnInit {
  joinId: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.joinId = params['id']; // Get the id from the route parameter
      this.auth.postRequest("/private/campaign/join", {campaignId: this.joinId}).then(success => {
        if (success) {
          console.log('JOIN successfully');
        } else {
          console.log('JOIN failed');
        }
      }).catch(error => {
        console.error('An error occurred during login', error);
        // Handle the error
      });
    });
  }

  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService
  )
  {}


}
