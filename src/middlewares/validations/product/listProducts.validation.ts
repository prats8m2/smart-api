import { Request, Response, NextFunction } from 'express';

const listProductsValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-PRODUCT';

	next();
};

export default listProductsValidation;
