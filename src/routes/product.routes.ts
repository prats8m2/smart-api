import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addProductValidation from '../middlewares/validations/product/addProduct.validation';
import deleteProductValidation from '../middlewares/validations/product/deleteProduct.validation';
import listProductsValidation from '../middlewares/validations/product/listProducts.validation';
import updateProductValidation from '../middlewares/validations/product/updateProduct.validation';
import ProductController from '../controllers/product/product.controller';
import getProductValidation from '../middlewares/validations/product/getProduct.validation';
import arrangeProductValidation from '../middlewares/validations/product/arrangeProduct.validation';

const router = Router();

const productController = new ProductController();
router.post(
	'/add',
	AuthMiddleware,
	addProductValidation,
	PermissionMiddleware,
	productController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateProductValidation,
	PermissionMiddleware,
	productController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getProductValidation,
	PermissionMiddleware,
	productController.get
);

router.get(
	'/list/:site/:type/:page/:limit',
	AuthMiddleware,
	listProductsValidation,
	PermissionMiddleware,
	productController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteProductValidation,
	PermissionMiddleware,
	productController.delete
);

router.patch(
	'/arrange',
	AuthMiddleware,
	arrangeProductValidation,
	PermissionMiddleware,
	productController.arrange
);

export default router;
