import { Request, Response, NextFunction } from 'express';

const listUsersValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-ACCOUNT';

	next();
};

export default listUsersValidation;
