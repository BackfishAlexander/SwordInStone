import { Component, Input, OnInit } from '@angular/core';
import { campaign } from 'src/app/dtos/campaigns';

@Component({
  selector: 'app-campaign-box',
  templateUrl: './campaign-box.component.html',
  styleUrls: ['./campaign-box.component.css']
})
export class CampaignBoxComponent implements OnInit{
  @Input() campaign!: campaign;
  users: string[] = [];
  owner!: string;

  ngOnInit(): void {
    this.owner = this.campaign.owner.username;
    for (let m of this.campaign.members) {
      if (m.user.username != this.owner)
      this.users.push(m.user.username);
    }
    this.users.sort((a, b) => b.length - a.length); // Sorts the users by name length
    if (this.users.length == 0) {
      this.users.push("No users");
    }
  }

  constructor() {
    
  }
}
