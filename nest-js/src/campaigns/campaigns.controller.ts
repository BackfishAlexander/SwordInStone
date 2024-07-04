import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserID } from 'src/common/decorators/userid.decorator';

@ApiBearerAuth()
@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(@Body() createCampaignDto: Prisma.CampaignsCreateInput, @UserID() userID: string) {
    return this.campaignsService.create(createCampaignDto, userID);
  }

  @Get()
  findAll(@UserID() userID: string) {
    return this.campaignsService.findAll(userID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignDto: Prisma.CampaignsUpdateInput) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }

  @Post(':id/shop')
  createShop(@Param('id') campaignId: string, @Body() createShopDto: Prisma.ShopCreateInput) {
    return this.campaignsService.createShop(createShopDto, campaignId);
  }

  @Post(':id/character')
  createCharacter(@Param('id') campaignId: string, @Body() createCharactersDto: Prisma.CharactersCreateInput) {
    return this.campaignsService.createCharacter(createCharactersDto, campaignId);
  }

  @Post(':id/import-character')
  createDNDBeyondCharacter(@Param('id') campaignId: string, @Query('url') dndBeyondUrl: string, @UserID() userID: string) {
    return this.campaignsService.createCharacterFromDNDBeyond(dndBeyondUrl, campaignId, userID);
  }

  @Post(':id/join')
  joinDNDCampaign(@Param('id') campaignId: string, @UserID() userID: string) {
    return this.campaignsService.joinCampaign(campaignId, userID);
  }
}
