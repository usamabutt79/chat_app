import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataExchange } from 'aws-sdk';
import { Date } from 'mongoose';

export type GroupMembershipDocument = GroupMembership & Document

@Schema({timestamps:true})
export class GroupMembership{

    @Prop({default: "user1234"})
    userId: string;

    @Prop({default: "grp123"})
    groupId: string;

    @Prop({default: false})
    is_admin: boolean;

    
}

export const GroupMembershipSchema = SchemaFactory.createForClass(GroupMembership);