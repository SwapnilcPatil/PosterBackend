import { Router } from 'express';
import { adminLogin, adminRegistration } from "../controllers/adminController";
const router = Router();


router.post("/registration", adminRegistration);
router.post("/login", adminLogin);

export default router;