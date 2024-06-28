import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CODE, EVENT_TYPE } from '../../../../config/config';
import sendResponse from '../../../utility/response';

const addEventValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validationSchema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		description: Joi.string().min(3).max(200),
		inHouse: Joi.number().valid(...Object.values(EVENT_TYPE)),
		location: Joi.string().min(3).max(100),
		googleLocation: Joi.string().min(3).max(200),
		entryFee: Joi.number(),
		site: Joi.number().required(),
		startDate: Joi.string(),
		endDate: Joi.string(),
		startTime: Joi.string(),
		endTime: Joi.string(),
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

	res.locals.action = 'ADD-EVENT';

	next();
};

export default addEventValidation;
