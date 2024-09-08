import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CODE } from '../../../../config/config';
import sendResponse from '../../../utility/response';

const listSessionValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validationSchema = Joi.object({
		site: Joi.number().required(),
		type: Joi.number().required(),
		page: Joi.number().required(),
		limit: Joi.number().required(),
	});

	const { error } = validationSchema.validate(req.params);

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

	res.locals.action = 'LIST-FEEDBACK';

	next();
};

export default listSessionValidation;
