import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Product_Category } from '../../db/entity/product_category';
import ArrangeProductI from '../../interface/category/arrangeProductI';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const arrangeProduct = async (req: Request, res: Response) => {
	//fetch data from body
	const { categoryId, products } = req.body;
	Logger.info(`Arrange product request`);

	await products.map(async (data: ArrangeProductI) => {
		const productCategory: Product_Category = await Product_Category.findOne({
			category_id: categoryId,
			product_id: data.productId,
		});
		productCategory.sequence = data.sequence;
		await productCategory.save();
	});

	sendResponse(res, true, CODE.SUCCESS, `Product re-arranged Successful`);
};

export default arrangeProduct;
