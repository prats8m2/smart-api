import { Request, Response, NextFunction } from 'express';

const listDevicesValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-DEVICE';

	next();
};

export default listDevicesValidation;
