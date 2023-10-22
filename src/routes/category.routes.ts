import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addSiteValidation from '../middlewares/validations/site/addSite.validation';
import updateSiteValidation from '../middlewares/validations/site/updateSite.validation';
import getSiteValidation from '../middlewares/validations/site/getRole.validation';
import listSitesValidation from '../middlewares/validations/site/listSites.validation';
import deleteSiteValidation from '../middlewares/validations/site/deleteSite.validation';
import CategoryController from '../controllers/category/category.controller';
import addCategoryValidation from '../middlewares/validations/category/addCategory.validation';

const router = Router();

const categoryController = new CategoryController();
router.post(
	'/add',
	AuthMiddleware,
	addCategoryValidation,
	PermissionMiddleware,
	categoryController.add
);
// router.put(
// 	'/update',
// 	AuthMiddleware,
// 	updateSiteValidation,
// 	PermissionMiddleware,
// 	categoryController.update
// );
// router.get(
// 	'/get/:id',
// 	AuthMiddleware,
// 	getSiteValidation,
// 	PermissionMiddleware,
// 	categoryController.get
// );

// router.get(
// 	'/list/:accountId/:page/:limit',
// 	AuthMiddleware,
// 	listSitesValidation,
// 	PermissionMiddleware,
// 	categoryController.list
// );

// router.delete(
// 	'/delete/:id',
// 	AuthMiddleware,
// 	deleteSiteValidation,
// 	PermissionMiddleware,
// 	categoryController.delete
// );

export default router;
