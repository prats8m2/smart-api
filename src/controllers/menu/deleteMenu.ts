import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Product } from '../../db/entity/product.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const deleteProduct = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete product request`);

	//delete a product
	const product = await Product.findOne(id);
	const result = await product.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Product Delete`, result);
};

export default deleteProduct;
