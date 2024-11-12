import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ShopsService {

  constructor(private readonly databaseService: DatabaseService) {}

  create(createShopDto: Prisma.ShopCreateInput, userID: string) {
    return 'This action adds a new shop';
  }

  findAll() {
    return `This action returns all shops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  update(id: number, updateShopDto: Prisma.ShopUpdateInput) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
