import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import getUserValidation from '../middlewares/validations/user/getUser.validation';
import listUsersValidation from '../middlewares/validations/user/listUsers.validation';
import deleteUserValidation from '../middlewares/validations/user/deleteUser.validation';
import listAccountValidation from '../middlewares/validations/user/listAccount.validation';
import addStaffValidation from '../middlewares/validations/staff/addStaff.validation';
import StaffController from '../controllers/staff/staff.controller';
import updateStaffValidation from '../middlewares/validations/staff/updateStaff.validation';
import getStaffValidation from '../middlewares/validations/staff/getStaff.validation';
import listStaffValidation from '../middlewares/validations/staff/listStaff.validation';
import deleteStaffValidation from '../middlewares/validations/staff/deleteStaff.validation';

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
	updateStaffValidation,
	PermissionMiddleware,
	staffController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getStaffValidation,
	PermissionMiddleware,
	staffController.get
);

router.get(
	'/list/:roleId/:page/:limit',
	AuthMiddleware,
	listStaffValidation,
	PermissionMiddleware,
	staffController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteStaffValidation,
	PermissionMiddleware,
	staffController.delete
);


export default router;
