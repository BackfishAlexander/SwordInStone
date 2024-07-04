import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Input as RouteParam } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { campaignDetailed, playerCharacter } from 'src/app/dtos/campaigns';
import { HttpService } from 'src/app/services/http.service';
import { endpointList } from 'src/environments/endpoint-list';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  campaignData!: campaignDetailed;
  loading = true;

  characters: playerCharacter[] = [];


  playerlist: playerList = {
    players: [],
    url: ""
  };

  // campaignId: any;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private auth: AuthenticationService
  ) {

  }

  showCreateButton(): boolean {
    let id = this.auth.getId();
    if (id == this.campaignData.ownerId) {
      return false;
    }
    for (let c of this.characters) {
      if (c.ownerId == id) {
        return false;
      }
    }
    return true;
  }

  tabClick(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id != null) {
        this.id = id;
      }
      else {
        throw new Error('Could not fetch campaign');
      }
    });

    this.httpService.getRequest<campaignDetailed>(this.httpService.buildURL(`${endpointList.campaigns}/${this.id}`), "json").then(
      (
        response => {
        this.campaignData = response;

        console.log(this.campaignData);

        for (let playerCharacter of this.campaignData.characters) {
          this.characters.push(playerCharacter);
        }

        // this.playerlist.url = "localhost:4200/invite/" + this.id;
        this.playerlist.url = "/invite/" + this.id;
    
        for (let player of this.campaignData.members) {
          if (this.campaignData.ownerId == player.user.id) {
            this.playerlist.players.push({username: player.user.username, role:"DM"});
          }
          else {
            this.playerlist.players.push({username: player.user.username, role:"PLAYER"});
          }
        }
        this.loading = false;
      }
    )
    );
  }

}


export interface playerList {
  players: player[];
  url: string;
}

export interface player {
  username: string;
  role: string;
}