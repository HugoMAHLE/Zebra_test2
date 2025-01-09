import { Router } from "express";
import { ResourceController } from "../controlers/resource.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router()

router.post('/Register', ResourceController.register)
router.post('/login', ResourceController.login)

router.get('/profile', verifyToken, ResourceController.getProfile)

export default router;
