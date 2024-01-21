import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Product } from '../../db/entity/product.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const addProduct = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, description, isNew, isSpecial, price, categories, site, type } =
		req.body;

	Logger.info(`Add product request`);

	//create a product
	let product: Product = new Product();
	product.name = name;
	product.description = description;
	product.price = price;
	product.site = site;
	product.type = type;
	product.categories = categories;
	product.isNew = isNew;
	product.isSpecial = isSpecial;

	const result = await product.save();
	sendResponse(res, true, CODE.SUCCESS, `Product added Successful`, result);
};

export default addProduct;
