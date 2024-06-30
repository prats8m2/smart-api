import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Order } from '../../db/entity/order.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const assignOrder = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, userId } = req.body;
	Logger.info(`Assign Order request`);

	const order: Order = await Order.findOne(id);
	if (!order) {
		sendResponse(res, false, CODE.NOT_FOUND, `Order not found`, order);
		return false;
	}
	//assign order
	order.user = userId;
	const result = await order.save();
	sendResponse(res, true, CODE.SUCCESS, `Order assigned Successfuly`, result);
};

export default assignOrder;
