import { Logger } from "@nestjs/common/services";
import { WebSocketGateway } from "@nestjs/websockets";
import {SubscribeMessage, WebSocketServer } from "@nestjs/websockets/decorators";
import { Socket } from "socket.io";
import { MessageService } from './message.service'

@WebSocketGateway()
export class ChatGatewayGroup {  
    private arr:{id:string,mobile_number:string}[]=[]
    constructor(private readonly MessageService: MessageService) {}


    @WebSocketServer()
    server;

    //1. Join 
    @SubscribeMessage('join')
    JoinChat(contact:Socket, user: {mobile_number:string,group:string}): void {
        this.arr.push({id:contact.id,mobile_number:user?.mobile_number})
        contact.join(user.group)
        console.log(`A user with mobile_number ${user?.mobile_number} connected with socket ${contact?.id}`)
        this.server.emit('join', `A user with mobile_number ${user?.mobile_number} connected`)
        //return await msg;
    }
    //2. message chat in Group
    @SubscribeMessage('message')
    async PersonMessage(contact:Socket, msg_box: {text:string,to:string}) {
        const msg = await this.MessageService.addmsg({msg_box})
        await this.server.to(msg_box.to).emit("message", msg)
    }
    
    public handleDisconnect(contact:Socket){
        Logger.warn(`User with Socket ${contact?.id} disconnected`)
    }

}