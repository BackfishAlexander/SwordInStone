import { Component, Input } from '@angular/core';
import { playerCharacter } from 'src/app/dtos/campaigns';
import { DiceRollerService } from 'src/app/services/dice-roller.service';
import { CharacterUtils } from 'src/app/utils/CharacterUtils';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {
  @Input() skill!: string;
  @Input() character!: playerCharacter;
  @Input() saving!: boolean;

  constructor(
    private roller: DiceRollerService
  ) {

  }

  normalizeSkillString() {
    return this.skill.toLowerCase().replaceAll(" ", "-");
  }

  getProficiencyTag(): string {
    if ((this.character.expertise ?? []).includes(this.normalizeSkillString())) {
      return "expertise";
    }
    else if ((this.character.proficiencies ?? []).includes(this.normalizeSkillString())) {
      return "proficiency"
    }
    else {
      return "no-proficiency"; 
    }
  }

  getSkillModifier(): string {
    let plus = CharacterUtils.getSkillPlus(this.character, this.skill.toLowerCase().replaceAll(" ", "-"));
    if (plus >= 0) {
      return "+" + plus;
    }
    else {
      return plus.toString();
    }
  }

  getSkillStat(): string {
    let skill = this.skill.toLowerCase().replaceAll(" ", "-");
    if (CharacterUtils.CHA_SKILLS.includes(skill)) {
      return "CHA";
    }
    else if (CharacterUtils.STR_SKILLS.includes(skill)) {
      return "STR";
    }
    else if (CharacterUtils.CON_SKILLS.includes(skill)) {
      return "CON";
    }
    else if (CharacterUtils.DEX_SKILLS.includes(skill)) {
      return "DEX";
    }
    else if (CharacterUtils.INT_SKILLS.includes(skill)) {
      return "INT";
    }
    else if (CharacterUtils.WIS_SKILLS.includes(skill)) {
      return "WIS";
    }
    else {
      // console.log(this.skill);
      // console.log(skill);
      return "NA";
    }
  }

  rollD20() {
    this.roller.triggerDiceRoll();
  }
}
