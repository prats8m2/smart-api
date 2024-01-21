import { NextFunction, Request, Response } from 'express';
import { CODE, TYPE } from '../../../../config/config';
import { Category } from '../../../db/entity/category.entity';
import sendResponse from '../../../utility/response';
import { Product } from '../../../db/entity/product.entity';

const addProductValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, price, categories, site, type } = req.body;

	if (!name || !price || !categories.length || !site || !type) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				name,
				price,
				categories,
				site,
				type,
			}
		);
		return;
	}

	if (type !== TYPE.AMENITIES && type !== TYPE.FOOD) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid type', {
			type,
		});
		return;
	}

	const isProductExist = await Product.findOne({ name, site });
	if (isProductExist) {
		sendResponse(
			res,
			false,
			CODE.CONFLICT,
			'Product name already exist ',
			name
		);
		return;
	}

	res.locals.action = 'ADD-PRODUCT';

	next();
};

export default addProductValidation;
