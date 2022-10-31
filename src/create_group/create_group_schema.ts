import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CreateGroupDocument = CreateGroup & Document

@Schema()
export class CreateGroup{

    @Prop()
    UserId: string;

    @Prop({required:true, maxlength: 15, minlength: 5})
    group_name: string;

    @Prop({default: "Group Description Not Added Yet!!!"})
    group_desc: string;

    @Prop()
    group_dp: string;

    
}

export const CreateGroupSchema = SchemaFactory.createForClass(CreateGroup);