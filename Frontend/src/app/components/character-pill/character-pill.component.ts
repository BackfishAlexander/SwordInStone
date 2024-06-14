import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-pill',
  templateUrl: './character-pill.component.html',
  styleUrls: ['./character-pill.component.css']
})
export class CharacterPillComponent {
  @Input() character: any;
}
