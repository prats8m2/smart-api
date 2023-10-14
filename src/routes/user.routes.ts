import { Router } from "express";
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import addUserValidation from '../middlewares/validations/user/addUser.validation';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import UserController from '../controllers/user/auth.controller';

const router = Router();

const userController = new UserController();
router.post('/add', AuthMiddleware, addUserValidation, PermissionMiddleware, userController.add);

export default router;
