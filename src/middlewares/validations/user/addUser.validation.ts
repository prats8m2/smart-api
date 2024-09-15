import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CODE } from '../../../../config/config';
import { User } from '../../../db/entity/user.entity';
import sendResponse from '../../../utility/response';

const addUserValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, username } = req.body;

	const validationSchema = Joi.object({
		username: Joi.string().min(3).max(30).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
		accountName: Joi.string().min(3).required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		status: Joi.number().required(),
		mobile: Joi.number(),
	});

	const { error } = validationSchema.validate(req.body);

	if (error) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Invalid Request',
			error?.details[0]?.message
		);
		return;
	}
	const isEmailExist = await User.findOne({ email });
	if (isEmailExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Email already exist ', email);
		return false;
	}

	const isUserNameExist = await User.findOne({ username });
	if (isUserNameExist) {
		sendResponse(
			res,
			false,
			CODE.CONFLICT,
			'Username already exist ',
			username
		);
		return false;
	}

	res.locals.action = 'ADD-ACCOUNT';

	next();
};

export default addUserValidation;
