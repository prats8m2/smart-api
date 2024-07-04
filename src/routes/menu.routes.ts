import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addMenuValidation from '../middlewares/validations/menu/addMenu.validation';
import deleteMenuValidation from '../middlewares/validations/menu/deleteMenu.validation';
import listMenusValidation from '../middlewares/validations/menu/listMenus.validation';
import updateMenuValidation from '../middlewares/validations/menu/updateMenu.validation';
import MenuController from '../controllers/menu/menu.controller';
import getMenuValidation from '../middlewares/validations/menu/getMenu.validation';
import AppAuthMiddleware from '../middlewares/authorization/appAuth.middleware';

const router = Router();

const menuController = new MenuController();
router.post(
	'/add',
	AuthMiddleware,
	addMenuValidation,
	PermissionMiddleware,
	menuController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateMenuValidation,
	PermissionMiddleware,
	menuController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getMenuValidation,
	PermissionMiddleware,
	menuController.get
);

router.get(
	'/list/:site/:page/:limit',
	AuthMiddleware,
	listMenusValidation,
	PermissionMiddleware,
	menuController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteMenuValidation,
	PermissionMiddleware,
	menuController.delete
);


router.get(
	'/app/',
	AppAuthMiddleware,
	menuController.appMenu
);

export default router;
