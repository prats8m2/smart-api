import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { User } from '../../db/entity/user.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
const listStaff = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		limit = MAX_ROW,
		page = 1,
		roleId,
	} = req.params as {
		limit?: number;
		page?: number;
		roleId?: number;
	};
	Logger.info(`List staff request`);


	//list Staff
	const [users, count] = await User.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			role: roleId,
		},
		relations: ['role'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Staff List Data`, { count, users });
};

export default listStaff;
