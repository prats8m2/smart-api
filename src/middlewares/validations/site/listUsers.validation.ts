import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { User } from '../../../db/entity/user.entity';
import { Not } from 'typeorm';

const listUsersValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.action = 'LIST-USER';

	next();
};

export default listUsersValidation;
