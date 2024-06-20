import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Order } from '../../db/entity/order.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const updateOrderStatus = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, status } =
		req.body;
	Logger.info(`Update order status request`);

	const order: Order = await Order.findOne(id);

	//update status
	order.status = status;

	const result = await order.save();
	sendResponse(res, true, CODE.SUCCESS, `Order updated Successful`, result);
};

export default updateOrderStatus;
