import { Request, Response } from 'express';
import { MoreThanOrEqual } from 'typeorm';
import { CODE, ORDER_STATUS } from '../../../config/config';
import { Order } from '../../db/entity/order.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const listOrdersAttendant = async (req: Request, res: Response) => {
	//fetch data from body
	const { loggedInId } = res.locals;
	Logger.info(`List order request`);

	// Fetch in-progress orders assigned to the user
	const inProgressOrders = await Order.find({
		where: { user: { id: loggedInId }, status: ORDER_STATUS.PROGRESS }, // Assuming '2' represents 'In Progress'
		relations: ['room', 'table', 'payment'],
	});

	// Fetch completed orders from the last 24 hours
	const completedOrders = await Order.find({
		where: {
			user: { id: loggedInId },
			status: ORDER_STATUS.DELIVERED, // Assuming '4' represents 'Delivered'
			updatedOn: MoreThanOrEqual(new Date(Date.now() - 24 * 60 * 60 * 1000)),
		},
		relations: ['room', 'table', 'payment'],
	});
	// Send response with the fetched orders
	sendResponse(res, true, CODE.SUCCESS, 'Orders fetched successfully', {
		inProgressOrders,
		completedOrders,
	});
};

export default listOrdersAttendant;
