import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import serverInstance from '../../app';
import { Order } from '../../db/entity/order.entity';
import { Order_Product } from '../../db/entity/order_product';
import { Payment } from '../../db/entity/payment.entity';
import Logger from '../../utility/logger/logger';
import { getTotalPrice } from '../../utility/order/getTotalPrice';
import sendResponse from '../../utility/response';
import { Site } from '../../db/entity/site.entity';

const updateOrder = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, type, table, site, room, products, categoryType } = req.body;
	Logger.info(`Add order request`);
	const io = serverInstance.getIo(); // Get the io instance from the server

	//fetch site data
	const siteData = await Site.findOne(site, {
		relations: ['account', 'wifi', 'settings', 'events', 'events.schedule'],
	});

	//fetch product prices
	const { sgstAmount, cgstAmount, serviceTaxAmount, totalAmountWithTaxes } =
		await getTotalPrice(products, siteData.settings);

	// fetch order details
	const order: Order = await Order.findOne(id, {
		relations: ['room', 'table', 'payment', 'user'],
	});

	//fetch payment
	let payment = await Payment.findOne(order?.payment?.id);
	// payment.type = PAYMENT_TYPE.OFFLINE;
	payment.site = site;
	payment.total = totalAmountWithTaxes;
	payment.cgst = cgstAmount;
	payment.sgst = sgstAmount;
	payment.serviceCharge = serviceTaxAmount;
	// payment.total = totalPrice;
	await payment.save();

	//update order
	order.type = type;
	order.site = site;
	order.room = room;
	order.table = table;
	order.categoryType = categoryType;

	const orderResult = await order.save();

	//delete all previous products of order
	await Order_Product.delete({ order_id: id });

	//create order_product
	products.map(async (product: any) => {
		const orderProduct = new Order_Product();
		orderProduct.order_id = id;
		orderProduct.product_id = product.id;
		orderProduct.quantity = product.quantity;
		await orderProduct.save();
	});
	io.emit('updateOrder', orderResult);
	sendResponse(
		res,
		true,
		CODE.SUCCESS,
		`Order updated Successful`,
		orderResult
	);
};

export default updateOrder;
