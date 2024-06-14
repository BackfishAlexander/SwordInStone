import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CampaignsService {

  constructor(private readonly databaseService: DatabaseService) {}

  create(createCampaignDto: Prisma.CampaignsCreateInput) {
    return this.databaseService.campaigns.create({
      data: createCampaignDto
    });
  }

  findAll() {
    return this.databaseService.campaigns.findMany({
      take: 10
    });
  }

  findOne(id: string) {
    return this.databaseService.campaigns.findUnique({
      where: {
        id
      }
    });
  }

  update(id: string, updateCampaignDto: Prisma.CampaignsUpdateInput) {
    return this.databaseService.campaigns.update({
      where: {
        id
      },
      data: updateCampaignDto
    });
  }

  remove(id: string) {
    return this.databaseService.campaigns.delete({
      where: {
        id
      }
    });
  }
}
