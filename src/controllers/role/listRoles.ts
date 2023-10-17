import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { CODE, MAX_ROW, ROLES } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Role } from '../../db/entity/role.entity';
import { Not } from 'typeorm';
const listRoles = async (req: Request, res: Response) => {
	//fetch data from body
	const { limit = MAX_ROW, page = 1 } = req.params as {
		limit?: number;
		page?: number;
	};
	const { account } = res.locals;
	Logger.info(`List role request`);

	//create a user
	const [roles, count] = await Role.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			account,
			type: Not(2),
		},
	});

	sendResponse(res, true, CODE.SUCCESS, `Role List Data`, { count, roles });
};

export default listRoles;
