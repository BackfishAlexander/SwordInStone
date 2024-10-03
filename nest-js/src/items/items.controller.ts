import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { UsersService } from 'src/users/users.service';
import { UserID } from 'src/common/decorators/userid.decorator';
import { Prisma } from '@prisma/client';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/:id')
  getItem(@Param('id') id: string) {
    return this.getItem(id);
  }

  @Post('/create-item')
  createItem(@UserID() userID: string, @Body() createItemDTO: Prisma.ItemCreateInput) {
    return this.itemsService.createUserItem(userID, createItemDTO);
  }

  @Delete('delete-item/:id')
  deleteItem(@UserID() userID: string, @Param('id') itemID: string) {
    return this.itemsService.deleteUserItem(userID, itemID)
  }
}
