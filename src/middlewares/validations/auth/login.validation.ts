import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
	const { email, username, password } = req.body;

	if (!email && !username) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Please enter valid email or username', {
			email,
			username,
		});
		return;
	}
	if (!password) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid password ', password);
		return;
	}
	next();
};

export default loginValidation;
