import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { User } from '../../db/entity/user.entity';
import { CODE, ROLES } from '../../../config/config';
import { Account } from '../../db/entity/account.entity';
import { Permission } from '../../db/entity/permission.entity';
import USER_PERMISSION from '../../constants/permissions/user';
import { In } from 'typeorm';
import { MD5 } from 'crypto-js'
import { Role } from '../../db/entity/role.entity'

const addUser = async (req: Request, res: Response) => {
	//fetch data from body
	const { email, username, password, accountName, firstName, lastName } = req.body;
	Logger.info(`Add user request`);

	//create an account
	const account = new Account();
	account.name = accountName;
	const newAccount = await account.save();

	//Fetch user sepcific permission to create role
	const userPermissions: Permission[] = await Permission.find({
		name: In(USER_PERMISSION),
	});

	//create a new role
	const role = new Role();
	role.name = ROLES.USER;
	role.type = 2;
	role.account = newAccount;
	role.permissions = userPermissions;
	const newRole = await role.save();

	//create a user
	const user = new User();
	user.firstName = firstName;
	user.lastName = lastName;
	user.email = email;
	user.username = username;
	user.password = MD5(password).toString();
	user.account = newAccount;
	user.role = newRole;
	const result = await user.save();

	sendResponse(res, true, CODE.SUCCESS, `User added Successful`, result);
};

export default addUser;
