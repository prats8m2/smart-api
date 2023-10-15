import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { User } from '../../../db/entity/user.entity';
import { Not } from 'typeorm';

const getUserValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	if (!id) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{ id }
		);
		return;
	}

	res.locals.action = 'VIEW-USER';

	next();
};

export default getUserValidation;
