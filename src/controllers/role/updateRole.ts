import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Role } from '../../db/entity/role.entity';

const updateRole = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, name, permissions } = req.body;
	Logger.info(`Update role request`);

	//get user details
	const role: Role = await Role.findOne(id);

	role.name = name ? name : role.name;
	role.permissions = permissions ? permissions : role.permissions;

	//update user
	const result = await role.save();
	sendResponse(res, true, CODE.SUCCESS, `Role updated Successful`, result);
};

export default updateRole;
