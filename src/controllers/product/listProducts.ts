import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { Product } from '../../db/entity/product.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
const listProducts = async (req: Request, res: Response) => {
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
	Logger.info(`List product request`);

	const [products, count] = await Product.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site,
			type,
		},
		relations: ['site'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Product List Data`, {
		count,
		products,
	});
};

export default listProducts;
