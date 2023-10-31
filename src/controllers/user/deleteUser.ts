import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity';
import { CODE } from '../../../config/config';
import { Account } from '../../db/entity/account.entity';

const deleteUser = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete user request`);

	//create a user
	const user = await User.findOne(id);
	const account: Account = user.account;
	await account.softRemove();
	const result = await user.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `User Delete`, result);
};

export default deleteUser;
