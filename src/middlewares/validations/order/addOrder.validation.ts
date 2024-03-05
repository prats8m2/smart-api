import { NextFunction, Request, Response } from 'express';
import { CODE, ORDER_TYPE } from '../../../../config/config';
import sendResponse from '../../../utility/response';

const addOrderValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { type, table, site, room, products } = req.body;

	if (!type || !products || !site) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				products,
				type,
				site,
			}
		);
		return;
	}

	if (Object.values(ORDER_TYPE).indexOf(type) === -1) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid order type', {
			type,
		});
		return;
	}

	if (type === ORDER_TYPE.ROOM && !room) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid room', {
			room,
		});
		return;
	}

	if (type === ORDER_TYPE.TABLE && !table) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid table', {
			table,
		});
		return;
	}

	res.locals.action = 'ADD-ORDER';

	next();
};

export default addOrderValidation;
