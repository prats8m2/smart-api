import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Order } from '../../db/entity/order.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const getOrder = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get Prder request`);

	//create a user
	const order = await Order.findOne(id, {
		relations: ['room', 'table', 'payment', 'user'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Order Data`, order);
};

export default getOrder;
