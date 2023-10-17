import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { CODE, MAX_ROW, ROLES } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Permission } from '../../db/entity/permission.entity';
const listPermissions = async (req: Request, res: Response) => {
	//fetch data from body
	const { limit = MAX_ROW, page = 1 } = req.params as {
		limit?: number;
		page?: number;
	};
	Logger.info(`List Permission request`);

	//create a user
	const [permissions, count] = await Permission.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
	});

	sendResponse(res, true, CODE.SUCCESS, `Permission List Data`, {
		count,
		permissions,
	});
};

export default listPermissions;
