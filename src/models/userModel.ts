
import { Schema, model,Document } from "mongoose";

export interface IUser extends Document {
    companyName: string;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    otp: string;
    otpExpirationTime: Date,
    gstNumber: string;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new Schema<IUser>({
    companyName: { type: String },
    fullName: {type: String},
    email: { type: String, unique: true, required: true },
    password: { type: String },
    phone: { type: String },
    otp: {type: String, },
    otpExpirationTime: { type: Date},
    gstNumber: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', userSchema);

