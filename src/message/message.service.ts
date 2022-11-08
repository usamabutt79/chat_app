import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message_schema';
import { MessageDto } from './message_dto'

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private MessageModel: Model<MessageDocument>){}

    //Add Message
    async addmsg(MessageDto: MessageDto){
        const msg = await (await this.MessageModel.create(MessageDto)).save()
        return await this.MessageModel.findById(msg._id)
    }

    //Get All Message
    async getAllMsg(user_id:string,contactId:string){
        return this.MessageModel.find({userId:user_id,contactId:contactId})
    }

}
