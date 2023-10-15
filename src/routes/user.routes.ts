import { Router } from "express";
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import addUserValidation from '../middlewares/validations/user/addUser.validation';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import UserController from '../controllers/user/user.controller';
import updateUserValidation from "../middlewares/validations/user/updateUser.validation";
import getUserValidation from '../middlewares/validations/user/getUser.validation';
import listUsersValidation from '../middlewares/validations/user/listUsers.validation';

const router = Router();

const userController = new UserController();
router.post(
	'/add',
	AuthMiddleware,
	addUserValidation,
	PermissionMiddleware,
	userController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateUserValidation,
	PermissionMiddleware,
	userController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getUserValidation,
	PermissionMiddleware,
	userController.get
);

router.get(
	'/list/:page/:limit',
	AuthMiddleware,
	listUsersValidation,
	PermissionMiddleware,
	userController.list
);

export default router;
