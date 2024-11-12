import { Tag } from "../dtos/campaigns";

export interface Item {
    id: string,
    
    name: string,
    description: string,
    url: string,
    type: ItemType,

    goldValue: number,
    silverValue: number,
    copperValue: number,

    tags: Tag[]
}



export enum ItemType {
    HELMET,
    MASK,
    CHESTPIECE,
    GAUNTLET,
    GLOVE,
    PANTS,
    BOOTS,
    ACCESSORY,
    JEWELRY,
    WEAPON,
    ARTIFACT,
  }