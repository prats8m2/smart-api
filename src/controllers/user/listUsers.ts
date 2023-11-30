import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity';
import { CODE, MAX_ROW, ROLES } from '../../../config/config';
import { Not } from 'typeorm';
const listUsers = async (req: Request, res: Response) => {
	//fetch data from body
	const { limit = MAX_ROW, page = 1 } = req.params as {
		limit?: number;
		page?: number;
	};
	Logger.info(`List user request`);

	//create a user
	const [users, count] = await User.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			role: {
				name: ROLES.OWNER,
			},
			status: 1,
		},
		relations: ['role'],
		order: {
			id: 'DESC',
		},
	});

	sendResponse(res, true, CODE.SUCCESS, `User List Data`, { count, users });
};

export default listUsers;
