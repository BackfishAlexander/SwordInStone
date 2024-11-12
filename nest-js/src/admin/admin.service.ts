import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class AdminService {
 
  constructor(private readonly databaseService: DatabaseService) {

  }

  private readonly GLOBAL_INVENTORY_ID = '00000000-0000-0000-0000-000000000000';

  async ensureGlobalInventory(): Promise<void> {
    const globalInventory = await this.databaseService.inventory.findUnique({
      where: { id: this.GLOBAL_INVENTORY_ID }
    });

    if (!globalInventory) {
      await this.databaseService.inventory.create({
        data: {
          id: this.GLOBAL_INVENTORY_ID,
        }
      })
    }
  }

  async createItem(item: Prisma.ItemCreateInput) {
    await this.ensureGlobalInventory();

    let i = await this.databaseService.item.create({
      data: {
        ...item
      }
    });

    return this.databaseService.inventoryItem.create({
      data: {
        inventory: {
          connect: {
            id: this.GLOBAL_INVENTORY_ID
          }
        },
        item: {
          connect: {
            id: i.id
          }
        }
      }
    });
  }

  async getGlobalItems(query: string) {
    await this.ensureGlobalInventory();
    
    let i = await this.databaseService.inventory.findUnique({
      where: {
        id: this.GLOBAL_INVENTORY_ID
      },
      select: {
        items: {
          select: {
            item: true,
          }
        }
      }
    });


    let qResults = i.items.map(inventoryItem => inventoryItem.item);

    console.log(query);
    if (query === "" || query == null) {
      return qResults;
    }
    else {
      return qResults.filter((item) => item.name.toLowerCase().trim().includes(query.toLowerCase().trim()));
    }
  }

  async createTag(name: string, description: string, color: string) {
    return this.databaseService.tag.create({
      data: {
        name,
        description,
        color
      }
    });
  }

  async getTags() {
    return this.databaseService.tag.findMany({
      take: 100
    })
  }

  async deleteTag(id: number) {
    return this.databaseService.tag.delete({
      where: {
        id: id
      }
    })
  }

  async makeAdmin(id: string) {
    try {
      await this.databaseService.users.update({
      where: {
        id
      },
      data: {
        role: "ADMIN"
      }
      });

      return {message: "admin added"};
    } catch (error) {
      throw new Error('Failed to add admin');
    }
  }  

  async makeUser(id: string) {
    try {
      await this.databaseService.users.update({
      where: {
        id
      },
      data: {
        role: "USER"
      }
      });

      return {message: "admin removed"};
    } catch (error) {
      throw new Error('Failed to remove admin');
    }
  }  

  async subscribeUser(id: string) {
    try {
      await this.databaseService.users.update({
      where: {
        id
      },
      data: {
        isSubscriber: true
      }
      });

      return {message: "User subscribed"};
    } catch (error) {
      throw new Error('Failed to subscribe user');
    }
  }  


  async unsubscribeUser(id: string) {
    try {
      await this.databaseService.users.update({
      where: {
        id
      },
      data: {
        isSubscriber: false
      }
      });

      return {message: "Unsubscribed"};
    } catch (error) {
      throw new Error('Failed to unsubscribe user');
    }
  }  


}
