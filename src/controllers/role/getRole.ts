import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, ROLES } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Role } from '../../db/entity/role.entity';

const getRole = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	const { account, loggedInRole } = res.locals;
	Logger.info(`Get role request`);

	//create a user
	const role = await Role.findOne(id, {
		relations: ['account', 'permissions'],
	});
	if (!role) {
		sendResponse(res, false, CODE.NOT_FOUND, `No role found`);
		return;
	}

	if (role && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (role?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	sendResponse(res, true, CODE.SUCCESS, `Role Data`, role);
};

export default getRole;
