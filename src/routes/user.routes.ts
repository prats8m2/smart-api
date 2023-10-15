import { Router } from "express";
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import addUserValidation from '../middlewares/validations/user/addUser.validation';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import UserController from '../controllers/user/user.controller';
import updateUserValidation from "../middlewares/validations/user/updateUser.validation";

const router = Router();

const userController = new UserController();
router.post('/add', AuthMiddleware, addUserValidation, PermissionMiddleware, userController.add);
router.post('/update', AuthMiddleware, updateUserValidation, PermissionMiddleware, userController.update);

export default router;
