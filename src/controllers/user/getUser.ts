import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity';
import { CODE } from '../../../config/config';

const getUser = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get user request`);

	//create a user
	const user = await User.findOne(id, {
		relations: ['role', 'role.permissions'],
	});

	sendResponse(res, true, CODE.SUCCESS, `User Data`, user);
};

export default getUser;
