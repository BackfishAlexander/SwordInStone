import { Component, Input } from '@angular/core';
import { playerCharacter } from 'src/app/dtos/campaigns';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent {
  @Input() character!: playerCharacter;

}
