import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import addUserValidation from '../middlewares/validations/user/addUser.validation';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import updateUserValidation from '../middlewares/validations/user/updateUser.validation';
import getUserValidation from '../middlewares/validations/user/getUser.validation';
import listUsersValidation from '../middlewares/validations/user/listUsers.validation';
import deleteUserValidation from '../middlewares/validations/user/deleteUser.validation';
import SiteController from '../controllers/site/site.controller';
import addSiteValidation from '../middlewares/validations/site/addSite.validation';
import updateSiteValidation from '../middlewares/validations/site/updateUser.validation';

const router = Router();

const siteController = new SiteController();
router.post(
	'/add',
	AuthMiddleware,
	addSiteValidation,
	PermissionMiddleware,
	siteController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateSiteValidation,
	PermissionMiddleware,
	siteController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getUserValidation,
	PermissionMiddleware,
	siteController.get
);

router.get(
	'/list/:page/:limit',
	AuthMiddleware,
	listUsersValidation,
	PermissionMiddleware,
	siteController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteUserValidation,
	PermissionMiddleware,
	siteController.delete
);

export default router;
