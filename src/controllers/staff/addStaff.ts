import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity';
import { CODE } from '../../../config/config';
import { MD5 } from 'crypto-js';

const addStaff = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		email,
		username,
		password,
		firstName,
		lastName,
		mobile,
		role,
		sites,
		status,
	} = req.body;
	const { account } = res.locals;
	Logger.info(`Add staff request`);

	//create a user
	const user = new User();
	user.firstName = firstName;
	user.lastName = lastName;
	user.email = email;
	user.username = username;
	user.mobile = mobile;
	user.password = MD5(password).toString();
	user.account = account;
	user.role = role;
	user.sites = sites;
	user.status = status;
	const result = await user.save();

	sendResponse(res, true, CODE.SUCCESS, `User staff Successful`, result);
};

export default addStaff;
