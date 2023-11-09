import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../services/campaign.service'; // Adjust the import path as needed
import { ChangeDetectorRef } from '@angular/core';


interface PlayerCharacter {
  characterId: number;
  characterName: string;
  imageID: string;
  str: number;
  dex: number;
  wis: number;
  int: number;
  cha: number;
  // Add any other properties that player characters have
}

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {
  campaign: any;
  campaignId: any;
  isCreateCharacterModalOpen: boolean = false;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  openCreateCharacterModal(): void {
    console.log('Opening modal');
    this.isCreateCharacterModalOpen = true;
    this.cd.detectChanges();
  }

  closeCreateCharacterModal(): void {
    console.log('Closing modal');
    this.isCreateCharacterModalOpen = false;
    this.cd.detectChanges();
  }

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
        },
        (error) => {
          console.error('Error fetching campaign data:', error);
        }
      );
    });
  }
}
