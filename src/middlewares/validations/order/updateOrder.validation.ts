import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CODE, ORDER_TYPE } from '../../../../config/config';
import { productSchema } from '../../../interface/schema/productSchema';
import sendResponse from '../../../utility/response';

const updateOrderValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validationSchema = Joi.object({
		id: Joi.number().required(),
		type: Joi.number().valid(...Object.values(ORDER_TYPE)),
		table: Joi.number(),
		room: Joi.number(),
		products: Joi.array().items(productSchema).required(),
		site: Joi.number().required(),
	});

	const { error } = validationSchema.validate(req.body);

	if (error) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Invalid Request',
			error?.details
		);
		return false;
	}

	res.locals.action = 'UPDATE-ORDER';

	next();
};

export default updateOrderValidation;
