import { Injectable } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from 'dgram';
@WebSocketGateway()
@Injectable()
export class MessageService {

}
