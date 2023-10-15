import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { User } from '../../../db/entity/user.entity';
import { Not } from 'typeorm';

const updateUserValidation = async (req: Request, res: Response, next: NextFunction) => {
	const { id, email, username } = req.body;

	if (!id) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Please enter all mandatory fields', {id
		});
		return;
	}

	if(email){
	const isEmailExist = await User.findOne({ email, id:Not(id) });
		if (isEmailExist) {
			sendResponse(res, false, CODE.CONFLICT, 'Email already exist ', email);
			return;
		}
	}

	if(username){
		const isUserNameExist = await User.findOne({ username, id:Not(id) });
		if (isUserNameExist) {
			sendResponse(res, false, CODE.CONFLICT, 'Username already exist ', username);
			return;
		}
	}

	res.locals.action = 'UPDATE-USER';

	next();
};

export default updateUserValidation;
