import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CharactersService {

  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: string) {
    return this.databaseService.characters.findUnique({
      where: {
        id
      }
    })
  }

  async remove(id: string) {
    return this.databaseService.characters.delete({
      where: {
        id
      }
    })
  }

  async updateHP(id: string, newHP: number) {
    return this.databaseService.characters.update({
      where: {
        id
      },
      data: {
        HP: Math.max(newHP, 0)
      }
    });
  }

  async updateColor(id: string, color: string) {
    this.updateRainbowSheet(id, false);
    return this.databaseService.characters.update({
      where: {
        id
      },
      data: {
        sheetColor: color
      }
    });
  }

  async updateRainbowSheet(id: string, isRainbow: boolean) {
    return this.databaseService.characters.update({
      where: {
        id
      },
      data: {
        rainbowSheet: isRainbow
      }
    });
  }

  async createCharacterItem(characterId: string, itemInfo: { itemId: string }) {
    // Step 1: Find the inventory ID of the given character
    const character = await this.databaseService.characters.findUnique({
        where: {
            id: characterId
        },
        select: {
            inventoryId: true
        }
    });

    if (!character || !character.inventoryId) {
        throw new Error('Character or inventory not found');
    }

    // Step 2: Create a new InventoryItem and link it to the character's inventory and the item
    return this.databaseService.inventoryItem.create({
        data: {
            itemId: itemInfo.itemId,
            inventoryId: character.inventoryId,
            quantity: 1  // Assuming the default quantity is 1
        }
    });
  }

}
