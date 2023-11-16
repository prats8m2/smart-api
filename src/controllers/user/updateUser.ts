import { Request, Response } from 'express'
import sendResponse from '../../utility/response'
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity'
import { CODE } from '../../../config/config'
import { MD5 } from 'crypto-js'
import { Account } from '../../db/entity/account.entity';

const updateUser = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		id,
		email,
		username,
		password,
		accountName,
		firstName,
		lastName,
		status,
	} = req.body;
	Logger.info(`Update user request`);

	//get user details
	const user: User = await User.findOne(id, { relations: ['role', 'account'] });
	const account: Account = user.account;
	user.firstName = firstName ? firstName : user.firstName;
	user.lastName = lastName ? lastName : user.lastName;
	user.username = username ? username : user.username;
	user.email = email ? email : user.email;
	user.password = password ? MD5(password).toString() : user.password;
	account.name = accountName ? accountName : account.name;
	account.status = status;

	//update account
	await account.save();
	//update user
	const result = await user.save();
	sendResponse(res, true, CODE.SUCCESS, `User updated Successful`, result);
};;

export default updateUser
