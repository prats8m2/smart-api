import { Request, Response } from 'express';
import { CODE, ORDER_STATUS, STATUS } from '../../../config/config';
import { Order } from '../../db/entity/order.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const cancelOrder = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.body;
	Logger.info(`Cancel Order request`);

	const order: Order = await Order.findOne(id);
	if (!order) {
		sendResponse(res, false, CODE.NOT_FOUND, `Order not found`, order);
		return false;
	}
	//assign order
	order.status = ORDER_STATUS.CANCELED;
	const result = await order.save();
	sendResponse(res, true, CODE.SUCCESS, `Order cancelled successfuly`, result);
};

export default cancelOrder;
