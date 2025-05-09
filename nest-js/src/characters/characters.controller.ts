import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @Post(':id/hp')
  async updateHP(@Param('id') id: string, @Body() hp: {hp: number}) {
    return this.charactersService.updateHP(id, hp.hp);
  }

  @Post(':id/color')
  async updateColor(@Param('id') id: string, @Body() color: {color: string}) {
    return this.charactersService.updateColor(id, color.color);
  }

  @Post(':id/rainbow-color')
  async updateRainbowSheet(@Param('id') id: string, @Body() rainbow: {rainbow: boolean}) {
    return this.charactersService.updateRainbowSheet(id, rainbow.rainbow);
  }

  @Post(':id/add-item')
  async addItem(@Param('id') id: string, @Body() itemInfo: {
    itemId: string,
    overrideName: string,
    OverrideDescription: string,
    overrideValue: string,
    quantity: number,
  }) {
    return this.charactersService.createCharacterItem(id, itemInfo);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}
