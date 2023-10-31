import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity';
import { CODE } from '../../../config/config';
import { MD5 } from 'crypto-js';

const updateStaff = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		id,
		email,
		username,
		password,
		firstName,
		lastName,
		mobile,
		role,
		sites,
	} = req.body;
	Logger.info(`Update staff request`);

	//get user details
	const user: User = await User.findOne(id, { relations: ['role', 'account'] });

	user.firstName = firstName || user.firstName;
	user.lastName = lastName || user.lastName;
	user.username = username || user.username;
	user.email = email || user.email;
	user.password = password ? MD5(password).toString() : user.password;
	user.role = role || user.role;
	user.mobile = mobile || user.mobile;
	user.sites = sites || user.sites;
	//update user
	const result = await user.save();
	sendResponse(res, true, CODE.SUCCESS, `staff updated Successful`, result);
};

export default updateStaff;
