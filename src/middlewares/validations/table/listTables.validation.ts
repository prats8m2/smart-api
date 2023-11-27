import { Request, Response, NextFunction } from 'express';

const listTablesValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-TABLE';

	next();
};

export default listTablesValidation;
