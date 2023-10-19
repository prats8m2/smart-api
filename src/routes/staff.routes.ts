import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import addUserValidation from '../middlewares/validations/user/addUser.validation';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import UserController from '../controllers/user/user.controller';
import updateUserValidation from '../middlewares/validations/user/updateUser.validation';
import getUserValidation from '../middlewares/validations/user/getUser.validation';
import listUsersValidation from '../middlewares/validations/user/listUsers.validation';
import deleteUserValidation from '../middlewares/validations/user/deleteUser.validation';
import listAccountValidation from '../middlewares/validations/user/listAccount.validation';
import addStaffValidation from '../middlewares/validations/staff/addStaff.validation';
import StaffController from '../controllers/staff/staff.controller';

const router = Router();

const staffController = new StaffController();
router.post(
	'/add',
	AuthMiddleware,
	addStaffValidation,
	PermissionMiddleware,
	staffController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateUserValidation,
	PermissionMiddleware,
	staffController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getUserValidation,
	PermissionMiddleware,
	staffController.get
);

router.get(
	'/list/:page/:limit',
	AuthMiddleware,
	listUsersValidation,
	PermissionMiddleware,
	staffController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteUserValidation,
	PermissionMiddleware,
	staffController.delete
);

router.get(
	'/accounts/list/:page/:limit',
	AuthMiddleware,
	listAccountValidation,
	PermissionMiddleware,
	staffController.listAccounts
);

export default router;
