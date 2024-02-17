import { Request, Response, NextFunction } from 'express';

const listMenusValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-PRODUCT';

	next();
};

export default listMenusValidation;
