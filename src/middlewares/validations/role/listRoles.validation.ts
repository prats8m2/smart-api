import { Request, Response, NextFunction } from 'express';

const listRolesValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-ROLE';

	next();
};

export default listRolesValidation;
