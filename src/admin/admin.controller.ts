import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("admin")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get("admins")
  findAll() {
    return this.adminService.findAll();
  }

  @Get('admins/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Put('admin/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
