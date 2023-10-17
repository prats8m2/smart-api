import { Request, Response, NextFunction } from 'express';

const listSitesValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-SITE';

	next();
};

export default listSitesValidation;
