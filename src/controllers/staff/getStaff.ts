import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { User } from '../../db/entity/user.entity';
import { CODE } from '../../../config/config';

const getSatff = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get staff request`);

	//create a user
	const user = await User.findOne(id, {
		relations: ['role', 'role.permissions'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Staff Data`, user);
};

export default getSatff;