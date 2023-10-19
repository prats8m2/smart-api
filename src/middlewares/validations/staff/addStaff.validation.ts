import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { User } from '../../../db/entity/user.entity';

const addStaffValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		email,
		username,
		password,
		accountName,
		firstName,
		lastName,
		role,
		sites,
	} = req.body;

	if (
		!email ||
		!username ||
		!password ||
		!accountName ||
		!firstName ||
		!lastName ||
		!role ||
		!sites.length
	) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				email,
				username,
				password,
				accountName,
				firstName,
				lastName,
			}
		);
		return;
	}

	const isEmailExist = await User.findOne({ email });
	if (isEmailExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Email already exist ', email);
		return;
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
		return;
	}

	res.locals.action = 'ADD-STAFF';

	next();
};

export default addStaffValidation;
