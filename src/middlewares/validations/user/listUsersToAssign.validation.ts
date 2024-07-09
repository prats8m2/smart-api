import { Request, Response, NextFunction } from 'express';

const listUsersToAssign = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-STAFF';

	next();
};

export default listUsersToAssign;
