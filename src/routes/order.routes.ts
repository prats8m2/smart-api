import { Router } from 'express';
import OrderController from '../controllers/order/order.controller';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addOrderValidation from '../middlewares/validations/order/addOrder.validation';
import deleteOrderValidation from '../middlewares/validations/order/deleteOrder.validation';
import getOrderValidation from '../middlewares/validations/order/getOrder.validation';
import listOrdersValidation from '../middlewares/validations/order/listOrders.validation';
import updateOrderValidation from '../middlewares/validations/order/updateOrder.validation';

const router = Router();

const orderController = new OrderController();
router.post(
	'/add',
	AuthMiddleware,
	addOrderValidation,
	PermissionMiddleware,
	orderController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateOrderValidation,
	PermissionMiddleware,
	orderController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getOrderValidation,
	PermissionMiddleware,
	orderController.get
);

router.get(
	'/list/:site/:page/:limit',
	AuthMiddleware,
	listOrdersValidation,
	PermissionMiddleware,
	orderController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteOrderValidation,
	PermissionMiddleware,
	orderController.delete
);

export default router;
