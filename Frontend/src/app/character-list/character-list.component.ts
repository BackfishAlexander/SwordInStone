import { CampaignService } from './../services/campaign.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerCharacter } from '../DTOs/PlayerCharacter';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  username: any;
  campaignId: any;
  characters: any;
  isCreateCharacterModalOpen: boolean = false;
  createButtonOn: boolean = false;
  @Input() type: string = "none";

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private cookieService: CookieService
        ) 
        {}

  openCreateCharacterModal(): void {
    console.log('Opening modal');
    this.isCreateCharacterModalOpen = true;
    // this.cd.detectChanges();
  }

  closeCreateCharacterModal(): void {
    console.log('Closing modal');
    this.isCreateCharacterModalOpen = false;
    // this.cd.detectChanges();
  }

  ngOnInit(): void {
    // console.log("Initializing character list of type: " + this.type);


    if (!this.type.toLowerCase().includes("no-button")) {
      this.createButtonOn = true;
    }

    if (this.type.toLowerCase().includes("campaign")){
      this.route.params.subscribe(params => {
        this.campaignId = params['id']; // Get the id from the route parameter
        this.campaignService.getCampaign(this.campaignId).subscribe(
          (data) => {
            // Sort player characters by name in alphabetical order
            if (data.playerCharacters) {
              data.playerCharacters.sort((a: PlayerCharacter, b: PlayerCharacter) => a.characterName.localeCompare(b.characterName));
            }
            this.characters = data.playerCharacters;
          },
          (error) => {
            console.error('Error fetching campaign data:', error);
          }
        );
      });
    }
    else if (this.type.toLowerCase().includes("player")) { 
      this.route.params.subscribe(params => {
        this.username = this.cookieService.get('username'); // Get the id from the route parameter
        this.campaignService.getUserPlayers().subscribe(
          (data) => {
            // Sort player characters by name in alphabetical order
            if (data) {
              data.sort((a: PlayerCharacter, b: PlayerCharacter) => a.characterName.localeCompare(b.characterName));
            }
            this.characters = data;
          },
          (error) => {
            console.error('Error fetching campaign data:', error);
          }
        );
      });
    }
  }

}
