import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../services/campaign.service'; // Adjust the import path as needed
import { ChangeDetectorRef } from '@angular/core';
import { PlayerCharacter } from '../DTOs/PlayerCharacter';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {
  activeTab: string = 'characters';  // Default active tab
  campaign: any;
  campaignId: any;
  isCreateCharacterModalOpen: boolean = false;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.campaignId = params['id']; // Get the id from the route parameter
      this.campaignService.getCampaign(this.campaignId).subscribe(
        (data) => {
          // Sort player characters by name in alphabetical order
          if (data.playerCharacters) {
            data.playerCharacters.sort((a: PlayerCharacter, b: PlayerCharacter) => a.characterName.localeCompare(b.characterName));
          }
          this.campaign = data;
          console.log(data);
          console.log(this.auth.getId());
        },
        (error) => {
          if (error.status == 403) {
            this.auth.logout();
          }
          if (error.status == 401) {
            //TODO: Don't push the word retard into your github please
            document.write("Nice try, retard. You don't have access to this campaign.");
          }
          if (error.status == 400) {
            document.write("Error loading campaign. Please try again.");
          }
        }
      );
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
