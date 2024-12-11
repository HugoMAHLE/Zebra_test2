import { Router } from "express";
import { UserController } from "../controlers/user.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router()

router.post('/Register', UserController.register)
router.post('/login', UserController.login)

router.get('/profile', verifyToken, UserController.getProfile)

export default router;
