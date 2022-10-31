import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContactDocument = Contact & Document

@Schema()
export class Contact{

    @Prop({required:true, maxlength: 15, minlength: 5})
    contact_name: string;

    @Prop({required: true, unique:true})
    mobile_number: number;

    @Prop({default: "Nothin About User"})
    about: string;

    @Prop()
    contact_dp: string;

    
}

export const ContactSchema = SchemaFactory.createForClass(Contact);