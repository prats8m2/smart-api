import { Request, Response, NextFunction } from 'express';

const listPermissionsValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-PERMISSION';

	next();
};

export default listPermissionsValidation;
