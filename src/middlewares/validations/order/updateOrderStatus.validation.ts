import { NextFunction, Request, Response } from 'express';
import { CODE, ORDER_STATUS, TYPE } from '../../../../config/config';
import sendResponse from '../../../utility/response';

const updateOrderStatusValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, status } = req.body;

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
	const allowedStatuses = new Set(Object.values(ORDER_STATUS));
	if (!allowedStatuses.has(status)){
			sendResponse(
				res,
				false,
				CODE.BAD_REQUEST,
				'Invalid Order Status',
				{
					id,
				}
			);
	} 
		
	if(status === ORDER_STATUS.DELIVERED){
		res.locals.action = 'MARK-ORDER-COMPLETE';
	}
	else{
		res.locals.action = 'UPDATE-ORDER-STATUS';
	}		

	next();
};

export default updateOrderStatusValidation;
