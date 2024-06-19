import { CODE } from '../../../../config/config';
import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';

const listOrdersValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-ORDER';
	const {site} = req.params;
	if(!site){
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{ site }
		);
		return false;
	}
	next();
};

export default listOrdersValidation;
