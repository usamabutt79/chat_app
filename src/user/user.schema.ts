import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document

@Schema()
export class User{

    @Prop()
    contactId: string;

    @Prop({required:true, maxlength: 15, minlength: 5})
    user_name: string;

    @Prop({required: true, unique:true})
    mobile_number: string;

    @Prop({required: true, minlength:8, maxlength: 15})
    password: string;

    @Prop({default: "Nothin About User"})
    about: string;

    @Prop()
    user_dp: string;

    @Prop({default: false})
    is_verified: boolean;
    
}

export const UserSchema = SchemaFactory.createForClass(User);