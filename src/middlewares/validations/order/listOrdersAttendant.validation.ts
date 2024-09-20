import { NextFunction, Request, Response } from 'express';

const listOrdersAttendantValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-ORDER';

	next();
};

export default listOrdersAttendantValidation;
