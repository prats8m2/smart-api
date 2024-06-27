import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { Order } from '../../db/entity/order.entity';
const listOrders = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		limit = MAX_ROW,
		page = 1,
		site,
		type,
	} = req.params as {
		limit?: number;
		page?: number;
		site?: string;
		type?: string;
	};
	Logger.info(`List order request`);

	//create a user
	const [orders, count] = await Order.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site,
			categoryType: type,
		},
		relations: ['room', 'table', 'payment'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Orders List Data`, {
		count,
		orders,
	});
};

export default listOrders;
