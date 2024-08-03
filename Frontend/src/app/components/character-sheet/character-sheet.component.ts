import { Component, Input } from '@angular/core';
import { playerCharacter } from 'src/app/dtos/campaigns';
import { DiceRollerService } from 'src/app/services/dice-roller.service';
import { CharacterUtils } from 'src/app/utils/CharacterUtils';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent {
  @Input() character!: playerCharacter;
  utils = CharacterUtils;
  skillList = [
    "Acrobatics",
    "Animal Handling",
    "Arcana",
    "Athletics",
    "Deception",
    "History",
    "Insight",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Nature",
    "Perception",
    "Performance",
    "Persuasion",
    "Religion",
    "Sleight of Hand",
    "Stealth",
    "Survival"
  ]

  constructor(
    private roller: DiceRollerService
  ) {

  }

  rollD20() {
    this.roller.triggerDiceRoll();
  }

}
