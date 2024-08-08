import { playerCharacter } from "../dtos/campaigns";

export class CharacterUtils {
    static STR_SKILLS = [
        "athletics"
    ]

    static DEX_SKILLS = [
        "acrobatics",
        "sleight-of-hand",
        "stealth"
    ]

    static CON_SKILLS = [

    ]

    static INT_SKILLS = [
        "arcana",
        "history",
        "investigation",
        "nature",
        "religion"
    ]

    static WIS_SKILLS = [
        "animal-handling",
        "medicine",
        "perception",
        "survival",
        "insight"
    ]

    static CHA_SKILLS = [
        "deception",
        "intimidation",
        "performance",
        "persuasion"
    ]

    static calculateModifierFromStat(stat: number): String {
        let n = Math.floor((stat - 10)/ 2);
        if (n >= 0) {
            return "+" + n;
        }
        else {
            return n.toString();
        }
    }

    static getSkillPlus(character: playerCharacter, skill: string): number{
        let bonus = 0;
        if (character.expertise.includes(skill)) {
            bonus += this.getProficiencyBonus(character) * 2;
        }
        else if (character.proficiencies.includes(skill)) {
            bonus += this.getProficiencyBonus(character);
        }

        if (this.STR_SKILLS.includes(skill)) {
            bonus += Math.floor((character.STR - 10) / 2);
        }
        else if (this.DEX_SKILLS.includes(skill)) {
            bonus += Math.floor((character.DEX - 10) / 2)
        }
        // Currently no CON skills
        // else if (this.CON_SKILLS.includes(skill)) {
        //     bonus += character.CON
        // }
        else if (this.INT_SKILLS.includes(skill)) {
            bonus += Math.floor((character.INT - 10) / 2)
        }
        else if (this.WIS_SKILLS.includes(skill)) {
            bonus += Math.floor((character.WIS - 10) / 2)
        }
        else if (this.CHA_SKILLS.includes(skill)) {
            bonus += Math.floor((character.CHA - 10) / 2)
        }

        return bonus;
    }   

    static getProficiencyBonus(character: playerCharacter): number {
        let level = character.level;
        if (level >= 17)
            return 6
        if (level >= 13)
            return 5
        if (level >= 9)
            return 4
        if (level >= 5)
            return 3
        else
            return 2
    }
}