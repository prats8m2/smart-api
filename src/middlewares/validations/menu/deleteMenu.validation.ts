import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';

const deleteMenuValidation = async (
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

	res.locals.action = 'DELETE-PRODUCT';

	next();
};

export default deleteMenuValidation;
