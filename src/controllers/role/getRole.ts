import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Role } from '../../db/entity/role.entity';

const getRole = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get role request`);

	//create a user
	const role = await Role.findOne(id, {
		relations: ['account', 'permissions'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Role Data`, role);
};

export default getRole;
