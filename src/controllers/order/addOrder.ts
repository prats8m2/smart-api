import { Request, Response } from 'express';
import { CODE, PAYMENT_TYPE } from '../../../config/config';
import serverInstance from '../../app';
import { Order } from '../../db/entity/order.entity';
import { Order_Product } from '../../db/entity/order_product';
import { Payment } from '../../db/entity/payment.entity';
import Logger from '../../utility/logger/logger';
import { getTotalPrice } from '../../utility/order/getTotalPrice';
import sendResponse from '../../utility/response';

const addOrder = async (req: Request, res: Response) => {
	try {
		//fetch data from body
		const { type, table, site, room, products, categoryType, description } =
			req.body;
		let paymentResult;
		Logger.info(`Add order request`);
		const io = serverInstance.getIo(); // Get the io instance from the server

		if (categoryType) {
			//fetch product prices
			const totalPrice = await getTotalPrice(products);

			//create payment
			let payment: Payment = new Payment();
			payment.type = PAYMENT_TYPE.OFFLINE;
			payment.site = site;
			payment.total = totalPrice;
			paymentResult = await payment.save();
		}

		//create an order
		let order: Order = new Order();
		order.type = type;
		order.site = site;
		order.room = room;
		order.table = table;
		order.categoryType = categoryType;
		order.description = description;
		order.payment = paymentResult ? paymentResult : null;
		//create order_product
		const orderResult = await order.save();

		if (categoryType) {
			products.map(async (product: any) => {
				const orderProduct = new Order_Product();
				orderProduct.order_id = orderResult.id;
				orderProduct.product_id = product.id;
				orderProduct.quantity = product.quantity;
				await orderProduct.save();
			});
		}
		//send notification for creating order
		io.emit('orderCreated', order);
		sendResponse(
			res,
			true,
			CODE.SUCCESS,
			`Order added Successful`,
			orderResult
		);
	} catch (e) {
		sendResponse(res, false, CODE.SERVER_ERROR, e.message);
	}
};

export default addOrder;
