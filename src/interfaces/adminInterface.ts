export interface IAdminRegistration extends Document {
    fullName: string;
    email: string;
    password: string;
    role: string;
}


export interface IAdminLogin extends Document {
    email: string;
    password: string;
}