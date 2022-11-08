import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GroupMembershipService } from './group_membership.service';
import { GroupMembershipDto } from './group_membership_dto';


@Controller('group-membership')
export class GroupMembershipController {
  constructor(private readonly GroupMembershipService: GroupMembershipService) {}

  //Join Group
  @Post('join_a_group')
  async joinGroup(@Body() GroupMembershipDto: GroupMembershipDto){
    try{
    const u= await this.GroupMembershipService.joinGroup(GroupMembershipDto)
    console.log(u)
    return u
    }
    catch(e){
      console.error(e);
      return e?.message;
    }
  }
  //Find Group Membership 
  @Get('find_single_group_membership/:id')
  async findGroupMembership(@Param('id') id: any){
    const group = await this.GroupMembershipService.findOneGroupMembership(id);
    console.log(group);
    return group;
  }

  //Leave Group
  @Delete('leave_group/:id')
  async leaveGroup(@Param('id') id: string){
    console.log("You Leaved Succefully...!!!")
    return await this.GroupMembershipService.leaveGroup(id);
  }
}
