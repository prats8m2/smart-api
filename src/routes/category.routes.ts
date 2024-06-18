import { Router } from 'express';
import CategoryController from '../controllers/category/category.controller';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addCategoryValidation from '../middlewares/validations/category/addCategory.validation';
import deleteCategoryValidation from '../middlewares/validations/category/deleteCategory.validation';
import getCategoryValidation from '../middlewares/validations/category/getCategory.validation';
import listCategoriesValidation from '../middlewares/validations/category/listCategories.validation';
import updateCategoryValidation from '../middlewares/validations/category/updateCategory.validation';
import arrangeCategoryValidation from '../middlewares/validations/category/arrangeCategory.validation';

const router = Router();

const categoryController = new CategoryController();
router.post(
	'/add',
	AuthMiddleware,
	addCategoryValidation,
	PermissionMiddleware,
	categoryController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateCategoryValidation,
	PermissionMiddleware,
	categoryController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getCategoryValidation,
	PermissionMiddleware,
	categoryController.get
);

router.get(
	'/list/:site/:type/:page/:limit',
	AuthMiddleware,
	listCategoriesValidation,
	PermissionMiddleware,
	categoryController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteCategoryValidation,
	PermissionMiddleware,
	categoryController.delete
);

router.patch(
	'/arrange',
	AuthMiddleware,
	arrangeCategoryValidation,
	PermissionMiddleware,
	categoryController.arrange
);

export default router;
