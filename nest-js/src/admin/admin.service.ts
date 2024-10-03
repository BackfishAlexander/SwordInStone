import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class AdminService {
 
  constructor(private readonly databaseService: DatabaseService) {

  }

  async createTag(name: string, description: string, color: string) {
    this.databaseService.tag.create({
      data: {
        name,
        description,
        color
      }
    });
  }

  async deleteTag(id: number) {
    this.databaseService.tag.delete({
      where: {
        id
      }
    })
  }

  async makeAdmin(id: string) {
    try {
      await this.databaseService.users.update({
      where: {
        id
      },
      data: {
        role: "ADMIN"
      }
      });

      return {message: "admin added"};
    } catch (error) {
      throw new Error('Failed to add admin');
    }
  }  

  async makeUser(id: string) {
    try {
      await this.databaseService.users.update({
      where: {
        id
      },
      data: {
        role: "USER"
      }
      });

      return {message: "admin removed"};
    } catch (error) {
      throw new Error('Failed to remove admin');
    }
  }  

  async subscribeUser(id: string) {
    try {
      await this.databaseService.users.update({
      where: {
        id
      },
      data: {
        isSubscriber: true
      }
      });

      return {message: "User subscribed"};
    } catch (error) {
      throw new Error('Failed to subscribe user');
    }
  }  


  async unsubscribeUser(id: string) {
    try {
      await this.databaseService.users.update({
      where: {
        id
      },
      data: {
        isSubscriber: false
      }
      });

      return {message: "Unsubscribed"};
    } catch (error) {
      throw new Error('Failed to unsubscribe user');
    }
  }  


}
