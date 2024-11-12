import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ItemsService {

  constructor(private readonly databaseService: DatabaseService) {

  }

  async findOne(id: string) {
    return this.databaseService.item.findUnique({
      where: {
        id
      }
    });
  }

  async remove(id: string) {
    return this.databaseService.item.delete({
      where: {
        id
      }
    });
  }

  async createUserItem(userId: string, createItemDTO: Prisma.ItemCreateInput) {
    return this.databaseService.item.create({
        data: {
            ...createItemDTO,  // Spread the properties from the DTO
            creator: {
                connect: { id: userId } // Connect the item to the specified user
            }
        }
    });
  }

  async deleteUserItem(userId: string, itemId: string) {
    if ((await this.findOne(itemId)).creatorId == userId) {
      return this.databaseService.item.delete({
        where: {
          id: itemId
        }
      });
    }
  }

  
}
