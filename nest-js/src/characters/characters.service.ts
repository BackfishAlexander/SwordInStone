import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CharactersService {

  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: string) {
    return this.databaseService.characters.findUnique({
      where: {
        id
      }
    })
  }

  async remove(id: string) {
    return this.databaseService.characters.delete({
      where: {
        id
      }
    })
  }

  async updateHP(id: string, newHP: number) {
    return this.databaseService.characters.update({
      where: {
        id
      },
      data: {
        HP: Math.max(newHP, 0)
      }
    });
  }

  async updateColor(id: string, color: string) {
    return this.databaseService.characters.update({
      where: {
        id
      },
      data: {
        sheetColor: color
      }
    });
  }
}
