import { Request, Response } from 'express';
import { CODE, ROLES } from '../../../config/config';
import { Product } from '../../db/entity/product.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const getProduct = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	const { account, loggedInRole } = res.locals;
	Logger.info(`Get Product request`);

	//get a product
	const product = await Product.findOne(id, {
		relations: ['site', 'site.account', 'categories'],
	});

	if (!product) {
		sendResponse(res, false, CODE.NOT_FOUND, `No product found`);
		return;
	}

	if (product && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (product?.site?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	sendResponse(res, true, CODE.SUCCESS, `Product Data`, product);
};

export default getProduct;
