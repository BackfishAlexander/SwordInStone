import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}


  async create(createUserDto: Prisma.UsersCreateInput) {
    return this.databaseService.users.create({
      data: createUserDto
    })
  }

  async findAll() {
    return this.databaseService.users.findMany({
      take: 10
    });
  }

  async findOne(id: string) {
    return this.databaseService.users.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateUserDto: Prisma.UsersUpdateInput) {
    return this.databaseService.users.update({
      where: {
        id,
      },
      data: updateUserDto
    })
  }

  async remove(id: string) {
    return this.databaseService.users.delete({
      where: {
        id,
      }
    });
  }
}
