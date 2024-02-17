import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Product } from '../../db/entity/product.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const getProduct = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get Product request`);

	//get a product
	const product = await Product.findOne(id, {
		relations: ['site', 'site.account', 'categories'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Product Data`, product);
};

export default getProduct;
