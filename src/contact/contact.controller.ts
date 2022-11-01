import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './contact_dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly ContactService: ContactService) {}

  //Add Contact
  @Post('add_contact')
  async addData(@Body() ContactDto: ContactDto){
    try{
    const u= await this.ContactService.addContact(ContactDto)
    console.log(u)
    return u
    }
    catch(e){
      console.error(e);
      return e?.message;
    }
  }

  //Find Contact
  @Get('find_single_contact')
  async getOne(@Query('id') id: any){
    const cont = await this.ContactService.findOneContact({id});
    console.log(cont);
    return cont;
  }

  //Find And Update Contact Information
  @Patch('update_contact/:id')
  async updateRoom(@Param('id') id: any, @Body() ContactDto: ContactDto){
    return await this.ContactService.updateOneContact({id}, {...ContactDto})
  }

  //Delete Single Contact
  @Delete('delete_contact/:id')
  async deleteOneHotel(@Param('id') id: string){
    console.log("Contact Deleted...!!!")
    return await this.ContactService.deleteOneContact(id);
  }

}
