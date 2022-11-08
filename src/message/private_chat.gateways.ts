import { Param } from "@nestjs/common";
import { Logger } from "@nestjs/common/services";
import { WebSocketGateway } from "@nestjs/websockets";
import { ConnectedSocket, SubscribeMessage, WebSocketServer } from "@nestjs/websockets/decorators";
import { Socket } from "socket.io";
import { MessageService } from './message.service'
export interface userInterface {
    id: string,
    mobile_number: string
}
@WebSocketGateway()
export class ChatGatewayPrivate {
    private arr: userInterface[] = []
    constructor(private readonly MessageService: MessageService) { }


    @WebSocketServer()
    server;

    //1. Join 
    @SubscribeMessage('join')
    JoinChat(contact: Socket, user: { mobile_number: string }): void {
        this.arr.push({ id: contact.id, mobile_number: user?.mobile_number })
        console.log(`A user with ph_no ${user?.mobile_number} connected with socket ${contact?.id}`)
        this.server.emit('join', `A user with mobile_number ${user?.mobile_number} connected`)
    }
    //2. message chat private
    @SubscribeMessage('message')
    async PersonMessage(contact: Socket, msg_box: { text: string, to: string }) {
        const msg = await this.MessageService.addmsg({ msg_box })
        const filterPh = this.arr.filter(val => val?.mobile_number == msg_box?.to).
            forEach(val => {
                this.server.to(val?.id).emit('message', { from: this.arr.filter((val) => val.id == contact?.id)[0]?.mobile_number, text: msg_box?.text })
            })
    }

    //Get All Message
    @SubscribeMessage('get_all_message/:friend_id')
    async getAllMsg(@Param('friend_id') f_id: string, @ConnectedSocket() client: Socket) {
        const msg = await this.MessageService.getAllMsg(f_id, client.id)
    }

    public handleDisconnect(contact: Socket) {
        Logger.warn(`User with Socket ${contact?.id} disconnected`)
    }

    //
    async MobileToSocket(mobile_number: string): Promise<userInterface[]> {
        return this.arr.filter(mob => mob?.mobile_number == mobile_number)
    }
    async SocketToMobile(id: string): Promise<string | undefined> {
        const aa = this.arr.filter(mob => mob?.id == id)
        return (aa?.length) ? aa[0]?.mobile_number : undefined
    }

}