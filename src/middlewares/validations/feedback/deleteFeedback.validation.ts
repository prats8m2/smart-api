import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CODE, EVENT_TYPE } from '../../../../config/config';
import sendResponse from '../../../utility/response';

const deleteFeedbackValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validationSchema = Joi.object({
		id: Joi.number().required(),
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

	res.locals.action = 'DELETE-FEEDBACK';

	next();
};

export default deleteFeedbackValidation;
