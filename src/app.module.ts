import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { CreateGroupController } from './create_group/create_group.controller';
import { CreateGroupService } from './create_group/create_group.service';
import { MessageService } from './message/message.service';
import { GroupMembershipService } from './group_membership/group_membership.service';
import { GroupMembershipController } from './group_membership/group_membership.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { Contact, ContactSchema } from './contact/contact_schema';
import { CreateGroup, CreateGroupSchema } from './create_group/create_group_schema';
import { GroupMembership, GroupMembershipSchema } from './group_membership/group_membership_schema';
import { Message, MessageSchema } from './message/message_schema';
import { ChatGatewayPrivate } from './message/private_chat.gateways';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://usamabutt786:18134156-079@cluster0.ajmez0k.mongodb.net/Chat_App'),
  MongooseModule.forFeature([{name: User.name, schema: UserSchema},
    {name: Contact.name, schema: ContactSchema},
    {name: CreateGroup.name, schema: CreateGroupSchema},
    {name: GroupMembership.name, schema: GroupMembershipSchema},
    {name: Message.name, schema: MessageSchema}])],
  controllers: [AppController,UserController,ContactController,CreateGroupController,GroupMembershipController],
  providers: [AppService,UserService,ContactService,CreateGroupService,MessageService,GroupMembershipService,ChatGatewayPrivate],
})
export class AppModule {}
