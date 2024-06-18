import { CODE } from '../../../../config/config';
import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';

const listCategoriesValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-CATEGORY';
	const { site, type } = req.params;
	if (!site || site === 'undefined' || !type || type === 'undefined') {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{ site, type }
		);
		return false;
	}
	next();
};

export default listCategoriesValidation;
