
import { Schema, model,Document } from "mongoose";

export interface IAdmin extends Document {
    fullName: string;
    email: string;
    password: string;
    role: string;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}


const adminSchema = new Schema<IAdmin>({
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Admin = model<IAdmin>('Admin', adminSchema);

