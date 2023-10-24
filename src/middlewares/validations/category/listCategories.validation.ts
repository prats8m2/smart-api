import { Request, Response, NextFunction } from 'express';

const listCategoriesValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-CATEGORY';

	next();
};

export default listCategoriesValidation;
