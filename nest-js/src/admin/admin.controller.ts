import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserID } from 'src/common/decorators/userid.decorator';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/admin-me')
  adminMe(@UserID() userId: string) {
    return this.adminService.makeAdmin(userId);
  }

  @Post('/create-tag')
  createTag(@Body() tag: {name: string, description: string, color: string}) {
    return this.adminService.createTag(tag.name, tag.description, tag.color);
  }

  @Post('/add-item')
  createItem(@Body() item: Prisma.ItemCreateInput) {
    return this.adminService.createItem(item);
  }


  @Post('/get-items')
  getGlobalItems(@Body() query: { query: string } ) {
    return this.adminService.getGlobalItems(query.query);
  }

  @Delete('/tags/:id')
  deleteTag(@Param('id') id: string) {
    return this.adminService.deleteTag(+id);
  }

  @Get('/tags')
  getTags() {
    return this.adminService.getTags();
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
