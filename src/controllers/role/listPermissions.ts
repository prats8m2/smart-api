import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, MAX_ROW, ROLES } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Permission } from '../../db/entity/permission.entity';
import { User } from '../../db/entity/user.entity';
import parsePermissionData from '../../utility/parsePermissionData';
const listPermissions = async (req: Request, res: Response) => {
	//fetch data from body
	const { limit = MAX_ROW, page = 1 } = req.params as {
		limit?: number;
		page?: number;
	};
	const { loggedInId } = res.locals;
	Logger.info(`List Permission request`);

	//create a user
	const userData = await User.findOne({
		relations: ['role', 'role.permissions'],
		where: [{ id: loggedInId }],
	});
	console.log('userData:', userData);
	const result = parsePermissionData(userData?.role?.permissions);
	sendResponse(res, true, CODE.SUCCESS, `Permission List Data`, {
		permissions: result,
	});
};

export default listPermissions;
