import { Router } from 'express';
import { getUsers, verifyEmail, verifyOtp, userRegistration, userLogin } from '../controllers/userController';

const router = Router();

// router.get('/users', getUsers);
router.post('/verifyEmail', verifyEmail);
router.post('/verifyOtp', verifyOtp);
router.post('/registration', userRegistration);
router.post('/login', userLogin);

export default router;
