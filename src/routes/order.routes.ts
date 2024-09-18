import { Router } from 'express';
import OrderController from '../controllers/order/order.controller';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addOrderValidation from '../middlewares/validations/order/addOrder.validation';
import deleteOrderValidation from '../middlewares/validations/order/deleteOrder.validation';
import getOrderValidation from '../middlewares/validations/order/getOrder.validation';
import listOrdersValidation from '../middlewares/validations/order/listOrders.validation';
import updateOrderValidation from '../middlewares/validations/order/updateOrder.validation';
import updateOrderStatusValidation from '../middlewares/validations/order/updateOrderStatus.validation';
import assignOrderValidation from '../middlewares/validations/order/assignOrder.validation';
import UserSessionMiddleware from '../middlewares/authorization/userSession.middleware';
import cancelOrderValidation from '../middlewares/validations/order/cancelOrderValidation';
const router = Router();
const orderController = new OrderController();
router.post(
	'/add',
	AuthMiddleware,
	// addOrderValidation,
	// PermissionMiddleware,
	orderController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateOrderValidation,
	PermissionMiddleware,
	orderController.update
);

router.put(
	'/update/status',
	AuthMiddleware,
	updateOrderStatusValidation,
	PermissionMiddleware,
	orderController.updateStatus
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getOrderValidation,
	PermissionMiddleware,
	orderController.get
);

router.get(
	'/list/:site/:type/:page/:limit',
	AuthMiddleware,
	listOrdersValidation,
	PermissionMiddleware,
	orderController.list
);

router.get(
	'/list/app',
	AuthMiddleware,
	UserSessionMiddleware,
	orderController.listAppOrders
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteOrderValidation,
	PermissionMiddleware,
	orderController.delete
);

router.patch(
	'/assign',
	AuthMiddleware,
	assignOrderValidation,
	PermissionMiddleware,
	orderController.assignOrder
);

export default router;
