import { NextFunction, Request, Response } from 'express';
import { CODE } from '../../../../config/config';
import sendResponse from '../../../utility/response';

const terminateSessionValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.body;

	if (!id) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				id,
			}
		);
		return;
	}

	res.locals.action = 'TERMINATE-SESSION';

	next();
};

export default terminateSessionValidation;
