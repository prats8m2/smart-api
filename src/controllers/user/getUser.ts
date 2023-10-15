import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { User } from '../../db/entity/user.entity';
import { CODE, ROLES } from '../../../config/config';
import { Account } from '../../db/entity/account.entity';
import { Permission } from '../../db/entity/permission.entity';
import USER_PERMISSION from '../../constants/permissions/user';
import { In } from 'typeorm';
import { MD5 } from 'crypto-js';
import { Role } from '../../db/entity/role.entity';

const getUser = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get user request`);

	//create a user
	const user = await User.findOne(id, {
		relations: ['role', 'role.permissions'],
	});

	sendResponse(res, true, CODE.SUCCESS, `User Data`, user);
};

export default getUser;
