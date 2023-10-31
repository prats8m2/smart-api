import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity';
import { CODE, ROLES } from '../../../config/config';
import { Account } from '../../db/entity/account.entity';
import { MD5 } from 'crypto-js';
import addDefaultRoles from '../../helpers/user/addDefaultRoles';

const addUser = async (req: Request, res: Response) => {
	//fetch data from body
	const { email, username, password, accountName, firstName, lastName } =
		req.body;
	Logger.info(`Add user request`);

	//create an account
	const account = new Account();
	account.name = accountName;
	const newAccount = await account.save();

	//add all deafult roles for account for eg: user/manager/staff
	const { newRole } = await addDefaultRoles(newAccount);

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
