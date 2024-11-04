import { Request, Response } from 'express';
import { CODE, ORDER_STATUS } from '../../../config/config';
import { Order } from '../../db/entity/order.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import serverInstance from '../../app';

const updateOrderStatus = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, status } = req.body;
	Logger.info(`Update order status request`);

	const io = serverInstance.getIo(); // Get the io instance from the server

	const order: Order = await Order.findOne({
		where: { id },
		relations: ['room', 'table', 'payment', 'user', 'site'],
	});

	if (!order) {
		sendResponse(res, false, CODE.NOT_FOUND, `Order not found`, order);
		return false;	}

	//update status
	order.status = status;

	const orderResult = await order.save();
	io.emit(`update_order_status_${order.site.id}_${order.categoryType}`, {
		...orderResult,
		status: order.status,
		isUpdated: true,
		isDeleted: order.status === ORDER_STATUS.CANCELED,
		isCompleted: order.status === ORDER_STATUS.COMPLETED,
	});

	sendResponse(
		res,
		true,
		CODE.SUCCESS,
		`Order updated Successful`,
		orderResult
	);
};

export default updateOrderStatus;
