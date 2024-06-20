import { Request, Response } from 'express';
import { CODE, PAYMENT_TYPE } from '../../../config/config';
import { Order } from '../../db/entity/order.entity';
import { Order_Product } from '../../db/entity/order_product';
import { Payment } from '../../db/entity/payment.entity';
import Logger from '../../utility/logger/logger';
import { getTotalPrice } from '../../utility/order/getTotalPrice';
import sendResponse from '../../utility/response';
import { Server as SocketIOServer } from 'socket.io';
import serverInstance from '../../app';

import { io } from '../../server'; // Import the io instance from the server file


const addOrder = async (req: Request, res: Response) => {
	//fetch data from body
	const { type, table, site, room, products } = req.body;
	Logger.info(`Add order request`);
	const io = serverInstance.getIo(); // Get the io instance from the server

	//fetch product prices
	const totalPrice = await getTotalPrice(products);

	//create payment
	let payment: Payment = new Payment();
	payment.type = PAYMENT_TYPE.OFFLINE;
	payment.site = site;
	payment.total = totalPrice;
	const paymentResult = await payment.save();

	//create an account
	let order: Order = new Order();
	order.type = type;
	order.site = site;
	order.room = room;
	order.table = table;
	order.payment = paymentResult;

	//create order_product
	const orderResult = await order.save();
	products.map(async (product: any) => {
		const orderProduct = new Order_Product();
		orderProduct.order_id = orderResult.id;
		orderProduct.product_id = product.id;
		orderProduct.quantity = product.quantity;
		await orderProduct.save();
	});
	io.emit('orderCreated', order);
	sendResponse(res, true, CODE.SUCCESS, `Order added Successful`, orderResult);
};;;

export default addOrder;
