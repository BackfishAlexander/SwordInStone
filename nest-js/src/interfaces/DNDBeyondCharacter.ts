export interface DNDBeyondCharacter {
    id: number;
    success: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        stats: Array<Stat>;
        bonusStats: Array<Stat>;
        overrideStats: Array<Stat>;
        race: {
            fullName: string;
        };
        inventory: InventoryItem;
        modifiers: Modifiers;
        decorations: {
            avatarUrl: string;
        };
        currencies: {
            cp: number;
            sp: number;
            gp: number;
            ep: number;
            pp: number;
        };
        classes: Array<classes>;
    }
}

export interface StatList {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
}

interface Stat {
    id: number;
    name: string;
    value: number;
}

interface classes {
    level: number;
    definition: {
        name: string;
    }
}

interface InventoryItem {
    id: number;
    definition: {
        name: string;
        quantity: number;
        equipped: boolean;
    };
}

interface Modifier {
    id: number;
    type: string;
    subType: string;
    value: number;
}

interface Modifiers {
    race: Array<Modifier>;
    class: Array<Modifier>;
    background: Array<Modifier>;
    item: Array<Modifier>;
    feat: Array<Modifier>;
    condition: Array<Modifier>;
}
