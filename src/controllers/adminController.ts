import { Request, Response } from "express";
import { Admin } from "../models/adminModel";
import message from "../utils/message";
import { IAdminLogin, IAdminRegistration } from "../interfaces/adminInterface";



export const adminRegistration = async (req: Request, res: Response) => {
    try {
        let data: IAdminRegistration = req.body;
        let admin = new Admin(data);
        await admin.save();
        res.status(201).json({ code: 201, message: message.ADMIN_REGISTRATION });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}



export const adminLogin  = async(req: Request, res: Response) => {
    try {
        let data: IAdminLogin = req.body;
        const adminDetails: IAdminLogin | null = await Admin.findOne({ email: data.email }, { email: 1, password: 1 });
        if (!adminDetails) {
            res.status(400).json({ message: message.NOT_FOUND });
        } else if (adminDetails.password === data.password) {
            res.status(200).json({ code: 200, message: message.ADMIN_LOGIN });
        } else {
            res.status(200).json({ code: 200, message: message.PASSWORD_MISMATCH });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}