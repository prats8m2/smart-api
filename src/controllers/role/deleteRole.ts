import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Role } from '../../db/entity/role.entity';

const deleteRole = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete role request`);

	//create a user
	const role = await Role.findOne(id);
	if (role.default) {
		sendResponse(res, true, CODE.BAD_REQUEST, `Default Role`, role);
		return false;
	}

	const result = await role.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Role Delete`, result);
};

export default deleteRole;
