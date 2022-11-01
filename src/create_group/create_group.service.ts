import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroup, CreateGroupDocument } from './create_group_schema';
import { CreateGroupDto } from './Create_Group_Dto'

@Injectable()
export class CreateGroupService {
    constructor(@InjectModel(CreateGroup.name) private CreateGroupModel: Model<CreateGroupDocument>){}

    //Create New Group
    async createGroup(CreateGroupDto: CreateGroupDto){
        const group = await this.CreateGroupModel.create(CreateGroupDto)
        return group;
    }

    //Find Single Group
    async findOneGroup(id: string){
        const group = await this.CreateGroupModel.findOne({_id:id});
        return group;
    }

    //Update Group Details
    async updateOneGroup(id: string,{group_name,group_desc,group_dp}: any){
        console.log(id)
        const updates = await this.CreateGroupModel.findByIdAndUpdate(id,{group_name,group_desc,group_dp})
        console.log(updates)
        return await this.findOneGroup(id)
    }

    //Delete Single Group
    async deleteOneGroup(id: string){
        const deleteOneGroup = await this.CreateGroupModel.findByIdAndDelete(id);
        return deleteOneGroup;
    }
}
