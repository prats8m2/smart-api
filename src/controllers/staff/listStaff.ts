import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity';
import { CODE, MAX_ROW, ROLES } from '../../../config/config';
import { Role } from '../../db/entity/role.entity';
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

	//create a user
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
