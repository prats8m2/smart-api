import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { CODE } from '../../../config/config';
import { Order } from '../../db/entity/order.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const getOrder = async (req: Request, res: Response) => {
	//fetch data from params
	const { id } = req.params;
	Logger.info(`Get Order request`);

	// Find the order with the necessary relations
	const order = await Order.findOne(id, {
		relations: ['room', 'table', 'payment', 'user', 'site', 'site.settings'],
	});

	if (!order) {
		return sendResponse(res, false, CODE.NOT_FOUND, `Order not found`);
	}

	// Custom query to fetch products with quantities
	const orderProducts = await getConnection()
		.createQueryBuilder()
		.select([
			'orderProduct.quantity',
			'product.id',
			'product.name',
			'product.description',
			'product.price',
			'product.image',
			'product.type',
			'product.status',
			'product.isNew',
			'product.isSpecial',
		])
		.from('order_product', 'orderProduct')
		.leftJoin('product', 'product', 'product.id = orderProduct.product_id')
		.where('orderProduct.order_id = :orderId', { orderId: id })
		.getRawMany();

	// Prepare the response data with product details and quantity
	const productsWithQuantity = orderProducts.map((op: any) => ({
		id: op.product_id,
		name: op.product_name,
		description: op.product_description,
		price: op.product_price,
		image: op.product_image,
		type: op.product_type,
		status: op.product_status,
		isNew: op.product_isNew,
		isSpecial: op.product_isSpecial,
		quantity: op.orderProduct_quantity,
	}));

	const responseData = {
		...order,
		products: productsWithQuantity,
	};

	sendResponse(res, true, CODE.SUCCESS, `Order Data`, responseData);
};

export default getOrder;
