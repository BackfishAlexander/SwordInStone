import { Component, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { playerList } from 'src/app/pages/campaign/campaign.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  @Input() playerlist!: playerList;

  constructor(private _clipboardService: ClipboardService) {

  }

  copyInvite() {
    console.log('copying ' + this.playerlist.url);
    this._clipboardService.copy(this.playerlist.url);
  }
}
