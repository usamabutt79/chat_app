import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Twilio } from 'twilio';
import { User, UserDocument } from './user.schema';
import { UserDto } from './user_dto'

@Injectable()
export class UserService {
    private twilioClient:Twilio
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>){
        const id="ACf7a1b8fedd4f3b39d9da840cdec5d336"
        const token="50099e003698d4f926f225d2a0bf2a34"
        this.twilioClient=new Twilio(id,token)
    }

    //Add User
    async AddUser(UserDto: UserDto) {
        return (await this.UserModel.create(UserDto)).save();
    }

    //Send OTP On User Mobile Number For Verification
    async SendOTP(mobile_number:string){
        const serviceID="VA5d1cc07b5bca27d377e2710bbfddaa69"
        return await this.twilioClient.verify.services(serviceID).verifications.create({to: mobile_number, channel: 'sms'})
    }

    //OTP Verification
    async VerifyMobileNumber(mobile_number:string,verificationCode: string) {
        const serviceSid = "VA5d1cc07b5bca27d377e2710bbfddaa69";
        const result = await this.twilioClient.verify.services(serviceSid).verificationChecks.create({to: mobile_number, code: verificationCode})
        return result;
    }

    //Forgot Password
    async ForgotPassword(mobile_number:string){
        return this.UserModel.findOne({mobile_number})  
    }

    //Set New Password
    async SetNewPassword({mobile_number, password,is_verified}:any){
        return this.UserModel.findOneAndUpdate({mobile_number}, {password,is_verified})  
    }




}
