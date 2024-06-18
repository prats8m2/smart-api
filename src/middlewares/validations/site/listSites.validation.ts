import { CODE } from '../../../../config/config';
import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';

const listSitesValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { accountId } = req.params;

	res.locals.action = 'LIST-SITE';
	if (accountId == null || accountId) {
		next();
	} else {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			accountId
		);
	}
};

export default listSitesValidation;
