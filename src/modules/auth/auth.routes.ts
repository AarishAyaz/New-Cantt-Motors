import {Router} from 'express';
import {registerController, loginController} from "./auth.controller";
import { protect } from '../../shared/middlewares/auth.middleware';

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;