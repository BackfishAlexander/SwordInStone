import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Input as RouteParam } from '@angular/core';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {
  @RouteParam() id: string = '';
  // campaignId: any;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.campaignId = params['id']; // Get the id from the route parameter
    //   // document.write(this.campaignId);
    //   console.log(this.campaignId);
    //   // this.campaignService.getCampaign(this.campaignId).subscribe(
    //   //   (data) => {
    //   //     // Sort player characters by name in alphabetical order
    //   //     if (data.playerCharacters) {
    //   //       data.playerCharacters.sort((a: PlayerCharacter, b: PlayerCharacter) => a.characterName.localeCompare(b.characterName));
    //   //     }
    //   //     this.campaign = data;
    //   //   },
    //   //   (error) => {
    //   //     console.error('Error fetching campaign data:', error);
    //   //   }
    //   // );
    // });
  }

}
