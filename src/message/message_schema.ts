import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type MessageDocument = Message & Document

@Schema()
export class Message{

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    userId: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Contact'})
    contactId: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'group'})
    groupId: string;

    @Prop({type: mongoose.Schema.Types.Mixed})
    msg_box:{text:string,to:string};

    @Prop()
    deliver_at: string;

    @Prop()
    delete_for_me: string;

    @Prop()
    delete_for_everyone: string;

    @Prop({type: mongoose.Schema.Types.Mixed})
    seen_by:{
        userId: string;
        date_and_time: string;
    };
    
}

export const MessageSchema = SchemaFactory.createForClass(Message);