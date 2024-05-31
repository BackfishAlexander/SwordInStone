import { DNDBeyondCharacter, StatList } from "../interfaces/DNDBeyondCharacter";

enum Stat {
    STR,
    DEX,
    CON,
    INT,
    WIS,
    CHA
}

export class CharacterUtils {
    static calculateCharacterStats(character: DNDBeyondCharacter): StatList {
        console.log(character);
        let result: StatList = {
            STR: 0,
            INT: 0,
            DEX: 0,
            WIS: 0,
            CON: 0,
            CHA: 0
        };
        result.STR = character.data.stats[Stat.STR].value + character.data.bonusStats[Stat.STR].value;
        result.INT = character.data.stats[Stat.INT].value + character.data.bonusStats[Stat.INT].value;
        result.WIS = character.data.stats[Stat.WIS].value + character.data.bonusStats[Stat.WIS].value;
        result.DEX = character.data.stats[Stat.DEX].value + character.data.bonusStats[Stat.DEX].value;
        result.CON = character.data.stats[Stat.CON].value + character.data.bonusStats[Stat.CON].value;
        result.CHA = character.data.stats[Stat.CHA].value + character.data.bonusStats[Stat.CHA].value;
        for (let modList of [
            character.data.modifiers.race,
            character.data.modifiers.class,
            character.data.modifiers.feat
        ]) {
            for (let mod of modList) {
                if (mod.type == "bonus") {
                    switch (mod.subType) {
                        case "intelligence-score": {
                            result.INT += mod.value;
                            break;
                        }
                        case "strength-score": {
                            result.STR += mod.value;
                            break;
                        }
                        case "dexterity-score": {
                            result.DEX += mod.value;
                            break;
                        }
                        case "wisdom-score": {
                            result.WIS += mod.value;
                            break;
                        }
                        case "charisma-score": {
                            result.CHA += mod.value;
                            break;
                        }
                        case "constitution-score": {
                            result.CON += mod.value;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    }



}