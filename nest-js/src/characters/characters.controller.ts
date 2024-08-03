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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}
