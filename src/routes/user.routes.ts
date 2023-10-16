import { Router } from "express";
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import addUserValidation from '../middlewares/validations/user/addUser.validation';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import UserController from '../controllers/user/user.controller';
import updateUserValidation from "../middlewares/validations/user/updateUser.validation";
import getUserValidation from '../middlewares/validations/user/getUser.validation';
import listUsersValidation from '../middlewares/validations/user/listUsers.validation';
import deleteUserValidation from '../middlewares/validations/user/deleteUser.validation';
import listAccountValidation from '../middlewares/validations/user/listAccount.validation';

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

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteUserValidation,
	PermissionMiddleware,
	userController.delete
);

router.get(
	'/accounts/list/:page/:limit',
	AuthMiddleware,
	listAccountValidation,
	PermissionMiddleware,
	userController.listAccounts
);

export default router;
