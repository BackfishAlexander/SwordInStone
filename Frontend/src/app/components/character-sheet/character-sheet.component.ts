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
  saveList = [
    "strength-saving-throws",
    "dexterity-saving-throws",
    "constitution-saving-throws",
    "intelligence-saving-throws",
    "wisdom-saving-throws",
    "charisma-saving-throws"
  ]

  constructor(
    private roller: DiceRollerService
  ) {

  }

  rollD20() {
    this.roller.triggerDiceRoll();
  }

  calcAC() {
    return Math.floor((this.character.DEX - 10)/ 2) + 10;
  }

  calcProfBonus() {
    let pBonus = "+";
    let level = this.character.level;

    if (level <= 4) {
      pBonus += "2";
    }
    else if (level <= 8) {
      pBonus += "3";
    }
    else if (level <= 12) {
      pBonus += "4";
    }
    else if (level <= 16) {
      pBonus += "5";
    }
    else if (level <= 20) {
      pBonus += "6"
    }
    return pBonus;
  }
}
