import { Request, Response } from 'express';
import { User, IUser } from '../models/userModel';
import message from "../utils/message";
import { generateOTP } from "../utils/global";
import { IVerifyOtp, IUserRegistration, IUserLogin } from "../interfaces/userInterface";




export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        const otp = generateOTP();
        data.otp = otp;
        data.otpExpirationTime = new Date();
        let user = new User(data);
        await user.save();
        res.status(200).json({ code: 200, message: message.OTP_SENT_TO_EMAIL, otp });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};




export const verifyOtp = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        const userDetails: IVerifyOtp | null = await User.findOne({ email: data.email }, { otp: 1, email: 1, otpExpirationTime: 1 });
        if (!userDetails) {
            res.status(400).json({ message: message.NOT_FOUND });
        } else if (userDetails.otp === data.otp) {
            res.status(200).json({ code: 200, message: message.OTP_VERIFIED });
        } else {
            res.status(200).json({ code: 200, message: message.INVALID_OTP });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


export const userRegistration = async (req: Request, res: Response) => {
    try {
        let data: IUserRegistration = req.body;
        await User.updateOne({ email: data.email }, data, {
            runValidators: true,
        });
        res.status(201).json({ code: 201, message: message.USER_REGISTRATION });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};



export const userLogin = async (req: Request, res: Response) => {
    try {
        let data: IUserLogin = req.body;
        const userDetails: IUserLogin | null = await User.findOne({ email: data.email }, { email: 1, password: 1 });
        if (!userDetails) {
            res.status(400).json({ message: message.NOT_FOUND });
        } else if (userDetails.password === data.password) {
            res.status(200).json({ code: 200, message: message.USER_LOGIN });
        } else {
            res.status(200).json({ code: 200, message: message.PASSWORD_MISMATCH });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};