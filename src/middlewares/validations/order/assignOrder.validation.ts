import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CODE } from '../../../../config/config';
import sendResponse from '../../../utility/response';

const assignOrderValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validationSchema = Joi.object({
		id: Joi.number().required(),
		userId: Joi.number().required(),
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

export default assignOrderValidation;
