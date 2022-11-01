import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupMembershipDto } from './group_membership_dto';
import { GroupMembership, GroupMembershipDocument } from './group_membership_schema';

@Injectable()
export class GroupMembershipService {
    constructor(@InjectModel(GroupMembership.name) private GroupMembershipModel: Model<GroupMembershipDocument>){}

    //Join Group
    async joinGroup(GroupMembershipDto: GroupMembershipDto){
        const group = await this.GroupMembershipModel.create(GroupMembershipDto)
        return group;
    }

    //Find Group Membership
    async findOneGroupMembership(id: string){
        const group = await this.GroupMembershipModel.findOne({_id:id});
        return group;
    }

    //Leave Group
    async leaveGroup(id: string){
        const leaveGroup = await this.GroupMembershipModel.findByIdAndDelete(id);
        return leaveGroup;
    }
}
