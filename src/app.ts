import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import adminRoutes from "./routes/adminRoutes";
import connectDB from './config/db';
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.all('*', function (req, res) {
    res.header("Access-Control-Allow-Origin", ["http://localhost:3000", "http://localhost:3001"]);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //...
   });
app.use('/api-v1/users', userRoutes);
// app.use('/api-v1/admin', adminRoutes);


export default app;
