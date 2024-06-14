import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Input as RouteParam } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void <=> *', [
        animate('0.1s')
      ])
    ])
  ]
})
export class CampaignComponent {
  @RouteParam() id: string = '';
  activeTab = 2;

  characters = [
    { name: 'Quintus Vale', 
    description: 'Level 4 Human Wizard', 
    url: "https://www.dndbeyond.com/avatars/40939/576/1581111423-121855753.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp",
    gp: "14",
    hp: 11,
    maxhp: 18
  },
    { name: 'Radomir Vale', 
    description: 'Level 4 Human Sorcerer', 
    url: "https://www.dndbeyond.com/avatars/41315/361/1581111423-115681234.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp",
    gp: "22",
    hp: 19,
    maxhp: 20 
  },
    // Add more characters as needed
  ];


  playerlist = {
    players: [
      {
        name: "GavinS",
        role: "DM"
      },
      {
        name: "LiterallyAlex",
        role: "PLAYER"
      },
      {
        name: "Phillim1111",
        role: "PLAYER"
      },
      {
        name: "TheLifeOfDustin",
        role: "PLAYER"
      }
    ],
    inviteurl: "www.google.com"
  };

  // campaignId: any;

  constructor(private route: ActivatedRoute) {

  }

  tabClick(tabNumber: number) {
    this.activeTab = tabNumber;
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
