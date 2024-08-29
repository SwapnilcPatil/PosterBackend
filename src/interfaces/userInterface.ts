export interface IVerifyOtp extends Document {
    email: string;
    otp: string;
    otpExpirationTime: Date
}


export interface IUserRegistration extends Document {
    fullName: string;
    email: string;
    companyName: string;
    password: string;
    phone: string;
    gstNumber: string | null;
}


export interface IUserLogin extends Document {
    email: string;
    password: string;
}