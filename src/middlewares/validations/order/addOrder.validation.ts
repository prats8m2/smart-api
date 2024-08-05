import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CODE, ORDER_CATEGORY, ORDER_TYPE } from '../../../../config/config';
import sendResponse from '../../../utility/response';
import { productSchema } from '../../../interface/schema/productSchema';

const addOrderValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { type, table, room } = req.body;

	const validationSchema = Joi.object({
		room: Joi.number().when('type', {
			is:
				ORDER_TYPE.ROOM ||
				ORDER_TYPE.SOS ||
				ORDER_TYPE.ROOM_SERVICE ||
				ORDER_TYPE.ROOM_CLEANING,
			then: Joi.required(),
		}),
		table: Joi.number().when('type', {
			is: ORDER_TYPE.TABLE,
			then: Joi.required(),
		}),
		type: Joi.number().required(),
		products: Joi.array()
			.items(productSchema)
			.when('categoryType', {
				is: ORDER_CATEGORY.FOOD || ORDER_CATEGORY.AMENITIES,
				then: Joi.required(),
			}),
		site: Joi.number().required(),
		description: Joi.string().min(2).max(500),
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

	if (Object.values(ORDER_TYPE).indexOf(type) === -1) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid order type', {
			type,
		});
		return;
	}

	if (type === ORDER_TYPE.ROOM && !room) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid room', {
			room,
		});
		return;
	}

	if (type === ORDER_TYPE.TABLE && !table) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid table', {
			table,
		});
		return;
	}

	res.locals.action = 'ADD-ORDER';

	next();
};

export default addOrderValidation;
