import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Role } from '../../db/entity/role.entity';

const addRole = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, permissions } = req.body;
	const { account } = res.locals;
	Logger.info(`Add Role request`);

	//create an account
	let role: Role = new Role();
	role.name = name;
	role.account = account;
	role.type = 99;
	role.default = false;
	role.permissions = permissions;
	const result = await role.save();
	sendResponse(res, true, CODE.SUCCESS, `Role added Successful`, result);
};

export default addRole;
