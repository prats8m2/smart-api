import { Request, Response, NextFunction } from 'express';

const listRoomsValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-ROOM';

	next();
};

export default listRoomsValidation;
