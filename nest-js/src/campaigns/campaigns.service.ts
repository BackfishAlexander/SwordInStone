import { Injectable, Request } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { DNDBeyondCharacter } from 'src/interfaces/DNDBeyondCharacter';
import axios from 'axios';
import { CharacterUtils } from 'src/utils/character-utils';

@Injectable()
export class CampaignsService {

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCampaignDto: Prisma.CampaignsCreateInput, userId: string) {
    return this.databaseService.campaigns.create({
      data: {
        ...createCampaignDto,
        owner: { connect: { id: userId } },
        members: {
          create: [{
            user: {
              connect: {
                id: userId
              }
            }
          }]
        }
      },
    });
  }
  

  async createCharacter(createCharacterDto: Prisma.CharactersCreateInput, campaignId: string) {
    const campaign = await this.findOne(campaignId);
    const inventory = await this.databaseService.inventory.create({
      data: {}
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    return await this.databaseService.characters.create({
      data: {
        ...createCharacterDto,
        inventory: {
          connect: { id: inventory.id }
        },
        campaign: {
          connect: { id: campaign.id }
        }
      }
    })
  }

  async createCharacterFromDNDBeyond(DNDBeyondURL: string, campaignId: string, userId: string) {
    const segments = DNDBeyondURL.split('/');
    const url = "https://character-service.dndbeyond.com/character/v5/character/" + segments[segments.length - 1] + "?includeCustomItems=true";
    const campaign = await this.findOne(campaignId);
    const inventory = await this.databaseService.inventory.create({
      data: {}
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    try {
      const dndBeyondChar = await axios.get<DNDBeyondCharacter>(url);
      const proficiencies = CharacterUtils.calculateCharacterProficiencies(dndBeyondChar.data);
      const expertice = CharacterUtils.calculateCharacterExpertise(dndBeyondChar.data);
      const stats = CharacterUtils.calculateCharacterStats(dndBeyondChar.data);
      return await this.databaseService.characters.create({
        data: {
          name: dndBeyondChar.data.data.name,
          description: "Character imported from DNDBeyond",
          STR: stats.STR,
          DEX: stats.DEX,
          WIS: stats.WIS,
          INT: stats.INT,
          CON: stats.CON,
          CHA: stats.CHA,
          HP: dndBeyondChar.data.data.baseHitPoints + (dndBeyondChar.data.data.classes[0].level * Math.floor((stats.CON - 10) / 2)),
          maxHP: dndBeyondChar.data.data.baseHitPoints + (dndBeyondChar.data.data.classes[0].level * Math.floor((stats.CON - 10) / 2)),
          campaign: {
            connect: { id: campaign.id }
          },
          inventory: {
            connect: { id: inventory.id }
          },
          owner: {
            connect: { id: userId }
          },
          avatarURL: dndBeyondChar.data.data.decorations.avatarUrl,
          race: dndBeyondChar.data.data.race.fullName,
          GP: dndBeyondChar.data.data.currencies.gp + (dndBeyondChar.data.data.currencies.ep * 50) + (dndBeyondChar.data.data.currencies.pp * 1000),
          SP: dndBeyondChar.data.data.currencies.sp,
          CP: dndBeyondChar.data.data.currencies.cp,
          class: dndBeyondChar.data.data.classes[0].definition.name,
          level: dndBeyondChar.data.data.classes[0].level,
          proficiencies: proficiencies,
          expertise: expertice,
        }
      })
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  async createShop(createShopDto: Prisma.ShopCreateInput, campaignId: string) {
    const campaign = await this.findOne(campaignId);
    const inventory = await this.databaseService.inventory.create({
      data: {}
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    return await this.databaseService.shop.create({
      data: {
        ...createShopDto,
        campaign: {
          connect: { id: campaignId }
        },
        inventory: {
          connect: { id: inventory.id }
        }
      }
    });
  }

  async findAll(userId: string) {
    return this.databaseService.campaigns.findMany({
      where: {
        members: {
          some: {
            userId
          }
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true
          }
        },
        members: {
          select: {
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }
      }
    }
    );
  }

  async findOne(id: string) {
    return this.databaseService.campaigns.findUnique({
      where: {
        id
      },
      include: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        },
        shops: {
          select: {
            id: true,
            name: true,
            description: true,
            enabled: true,
            inventory: {
              select: {
                id: false,
                items: true
              }
            }
          }
        },
        characters: true
      }
    });
  }

  async update(id: string, updateCampaignDto: Prisma.CampaignsUpdateInput) {
    return this.databaseService.campaigns.update({
      where: {
        id
      },
      data: updateCampaignDto
    });
  }

  async joinCampaign(campaignId: string, userId: string) {
    return this.databaseService.campaigns.update({
      where: {
        id: campaignId
      }, 
      data: {
        members: {
          create: [{
            user: {
              connect: {
                id: userId
              }
            }
          }]
        }
      }
    })
  }

  async remove(id: string) {
    return this.databaseService.campaigns.delete({
      where: {
        id
      }
    });
  }
}
