import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date } from 'mongoose';
import { User } from 'src/user/user.schema';

export type GroupMembershipDocument = GroupMembership & Document

@Schema({timestamps:true})
export class GroupMembership{

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'user'})
    UserId: User;

    @Prop({default: "grp123"})
    groupId: string;

    @Prop({default: false})
    is_admin: boolean;

    
}

export const GroupMembershipSchema = SchemaFactory.createForClass(GroupMembership);