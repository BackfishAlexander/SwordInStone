import { Component, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  @Input() playerlist: any;

  constructor(private _clipboardService: ClipboardService) {

  }

  copyInvite() {
    this._clipboardService.copy(this.playerlist.inviteurl);
  }
}
