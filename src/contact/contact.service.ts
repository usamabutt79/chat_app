import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contact_schema';
import { ContactDto } from './contact_dto'

@Injectable()
export class ContactService {
    constructor(@InjectModel(Contact.name) private ContactModel: Model<ContactDocument>){}

    //Add Contact
    async addContact(ContactDto: ContactDto){
        const contact = await this.ContactModel.create(ContactDto)
        return contact;
    }

    //Find Single Contact
    async findOneContact(id: any){
        const cont = await this.ContactModel.findOne({id});
        return cont;
    }

    //Update Contact Information
    async updateOneContact(id: any,{contact_name,mobile_number,about,contact_dp}: ContactDto){
        const updates = await this.ContactModel.findOneAndUpdate({id},{contact_name,mobile_number,about,contact_dp})
        return await this.findOneContact(updates?._id)
    }

    //Delete Single Contact
    async deleteOneContact(id: string){
        const deleteOneContact = await this.ContactModel.findByIdAndDelete(id);
        return deleteOneContact;
    }
}
