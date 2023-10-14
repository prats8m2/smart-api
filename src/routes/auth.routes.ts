import { Router } from 'express';
import AuthController from '../controllers/auth/auth.controller';
import loginValidation from '../middlewares/validations/auth/login.validation';

const router = Router();

const authController = new AuthController();
router.post('/login', loginValidation, authController.login);

export default router;
