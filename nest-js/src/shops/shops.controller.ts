import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { Prisma } from '@prisma/client';
import { UserID } from 'src/common/decorators/userid.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  create(@Body() createShopDto: Prisma.ShopCreateInput, @UserID() userID: string) {
    return this.shopsService.create(createShopDto, userID);
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: Prisma.ShopUpdateInput) {
    return this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }
}
