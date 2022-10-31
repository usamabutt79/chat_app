import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GroupMembershipDocument = GroupMembership & Document

@Schema()
export class GroupMembership{

    @Prop()
    userId: string;

    @Prop()
    groupId: string;

    @Prop()
    is_admin: boolean;

    @Prop()
    joining_date: string;

    
}

export const GroupMembershipSchema = SchemaFactory.createForClass(GroupMembership);