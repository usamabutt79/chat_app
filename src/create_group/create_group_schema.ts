import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/user.schema';

export type CreateGroupDocument = CreateGroup & Document

@Schema()
export class CreateGroup{

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'user'})
    UserId: User;

    @Prop({required:true, maxlength: 25, minlength: 5})
    group_name: string;

    @Prop({default: "Group Description Not Added Yet!!!"})
    group_desc: string;

    @Prop()
    group_dp: string;

    
}

export const CreateGroupSchema = SchemaFactory.createForClass(CreateGroup);