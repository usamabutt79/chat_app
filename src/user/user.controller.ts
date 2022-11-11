import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user_dto'

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('adduser')
  async create(@Body() UserDto: UserDto) {
    const person = await this.UserService.AddUser(UserDto);
    console.log(person);
    return person
  }
  
  @Post('user_varification')
  async SendOTP(@Body() body: any) {
    const z = await this.UserService.SendOTP(body.to);
    return z
  }

  @Get('verify_otp')
  async VerifyMobileNumber(@Body() bodyy: any,) {
    const z = await this.UserService.VerifyMobileNumber(bodyy.to, bodyy.code);
    if(z.status=="approved"){
      await this.UserService.SetNewPassword({mobile_number:bodyy.to,is_verified:true})
    }
    return z;
  }

  @Post('forgot_password')
  async ForgotPassword(@Body() UserDto:Partial<UserDto>){
    const uname = await this.UserService.ForgotPassword(UserDto.mobile_number);
    console.log(UserDto)
    if(uname){
      const z = await this.UserService.SendOTP(uname.mobile_number);
      return z;
    }
    else{
      console.log("Mobile Number does not exist");
      return "Mobile Number does not exist";
    }
  }
  @Patch('update_password/:mobile_number')
  async UpdatePassword(@Param('mobile_number') mobile_number:any, @Body() UserDto: Partial<UserDto>){
    return await this.UserService.SetNewPassword({mobile_number, ...UserDto})
  }

  @Patch('update_contact/:mobile_number')
  async UpdateContact(@Param('mobile_number') mobile_number:any, @Body() UserDto: Partial<UserDto>){
    return await this.UserService.UpdateContact({mobile_number, ...UserDto})
  }

  @Get('get_user/:id')
  async GetUser(@Param('id') id:string){
    const user = await this.UserService.findone({id})
    console.log(user)
    return user
  }
}
