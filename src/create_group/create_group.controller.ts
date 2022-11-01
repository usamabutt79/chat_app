import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateGroupService } from './create_group.service';
import { CreateGroupDto } from './Create_Group_Dto'

@Controller('create-group')
export class CreateGroupController {
  constructor(private readonly createGroupService: CreateGroupService) {}

  //Create New Group
  @Post('create_new_group')
  async addData(@Body() CreateGroupDto: CreateGroupDto){
    try{
    const u= await this.createGroupService.createGroup(CreateGroupDto)
    console.log(u)
    return u
    }
    catch(e){
      console.error(e);
      return e?.message;
    }
  }

  //Find Group
  @Get('find_single_group/:id')
  async getOne(@Param('id') id: any){
    const group = await this.createGroupService.findOneGroup(id);
    console.log(group);
    return group;
  }

  //Find And Update Group Information
  @Patch('update_group/:id')
  async updateGroup(@Param('id') id: string, @Body() CreateGroupDto: CreateGroupDto){
    return await this.createGroupService.updateOneGroup(id, {...CreateGroupDto})
  }

  //Delete Single Group
  @Delete('delete_group/:id')
  async deleteOneGroup(@Param('id') id: string){
    console.log("Group Deleted...!!!")
    return await this.createGroupService.deleteOneGroup(id);
  }
}
