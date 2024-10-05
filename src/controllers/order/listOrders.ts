import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { Order } from '../../db/entity/order.entity';
import { MoreThanOrEqual } from 'typeorm';

const listOrders = async (req: Request, res: Response) => {
	//fetch data from body
	const { site, categoryType, room, table, orderType } = req.params as {
		site?: string;
		categoryType?: string;
		orderType?: string;
		room?: number;
		table?: number;
	};

	Logger.info(`List order request`);

	//create a user
	const whereClause: any = { site };
	if (categoryType !== null && categoryType !== undefined) {
		whereClause.categoryType = categoryType;
	}

	const currentDate = new Date();

	if (room !== null && room !== undefined) {
		whereClause.room = { id: room };
		// Orders after 12:00 PM today
		whereClause.createdAt = MoreThanOrEqual(
			new Date(currentDate.setHours(12, 0, 0, 0))
		);
	}

	if (table !== null && table !== undefined) {
		whereClause.table = { id: table };
		// Orders from the last hour
		whereClause.createdAt = MoreThanOrEqual(
			new Date(currentDate.getTime() - 60 * 60 * 1000)
		);
	}

	if (orderType !== '0') {
		whereClause.type = orderType;
	}

	const [orders, count] = await Order.findAndCount({
		where: whereClause,
		relations: ['room', 'table', 'payment', 'user'],
		order: { createdOn: 'DESC' },
	});

	sendResponse(res, true, CODE.SUCCESS, `Orders List Data`, {
		count,
		orders,
	});
};

export default listOrders;
