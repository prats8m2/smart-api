import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CODE } from '../../../../config/config';
import sendResponse from '../../../utility/response';

const addFeedbackValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validationSchema = Joi.object({
		name: Joi.string().min(3).max(50),
		email: Joi.string().email().min(3).max(200),
		mobile: Joi.string().min(10).max(15),
		review: Joi.string().min(3).max(500),
		cleanlinessRating: Joi.number().integer().min(1).max(5).required(),
		serviceQualityRating: Joi.number().integer().min(1).max(5).required(),
		facilitiesRating: Joi.number().integer().min(1).max(5).required(),
		foodRating: Joi.number().integer().min(1).max(5).required(),
		overallRating: Joi.number().integer().min(1).max(5).required(),
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

	res.locals.action = 'ADD-FEEDBACK';

	next();
};

export default addFeedbackValidation;
