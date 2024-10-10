export interface campaign {
    id: string,
    name: string,
    description: string,
    ownerId: string,
    owner: {
      username: string
    },
    members: [
      {
        user: {
          id: string,
          username: string
        }
      }
    ]
}

export interface campaignDetailed {
  id: string,
  name: string,
  description: string,
  ownerId: string,
  shops: [
    {
      id: string,
      name: string,
      description: string,
      enabled: boolean,
      inventory: {
        items: []
      }
    }
  ]
  characters: playerCharacter[],
  members: [
    {
      user: {
        id: string,
        username: string
      }
    }
  ]
}

export interface playerCharacter {
  id: string,
  name: string,
  description: string,
  avatarURL: string,
  campaignId: string,
  ownerId: string,
  owner: {
    username: string,
    isSubscriber: boolean,
  },
  inventoryId: string,
  race: string,
  level: number,
  class: string,
  STR: number,
  DEX: number,
  CON: number,
  WIS: number,
  INT: number,
  CHA: number,
  GP: number,
  SP: number,
  CP: number,
  HP: number,
  maxHP: number,
  AC: number | null,
  walkingSpeed: number,
  proficiencies: string[],
  expertise: string[],
  sheetColor: string,
  rainbowSheet: boolean,
  inventory: Inventory,
}

export interface Inventory {
  id: string,
}

export interface Tag {
  id: number,
  name: string,
  description: string,
  color: string
}

export interface TagList {
  tags: Tag[];
}