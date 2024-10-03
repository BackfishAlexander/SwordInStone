import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserID } from 'src/common/decorators/userid.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/admin-me')
  adminMe(@UserID() userId: string) {
    return this.adminService.makeAdmin(userId);
  }

  @Post('/create-tag')
  createTag(tag: {name: string, description: string, color: string}) {
    return this.adminService.createTag(tag.name, tag.description, tag.color);
  }

  @Post('/user-me')
  userMe(@UserID() userId: string) {
    return this.adminService.makeUser(userId);
  }

  @Post('/subscribe-me')
  subscribeMe(@UserID() userId: string) {
    return this.adminService.subscribeUser(userId);
  }

  @Post('/unsubscribe-me')
  unsubscribeMe(@UserID() userId: string) {
    return this.adminService.unsubscribeUser(userId);
  }
}
