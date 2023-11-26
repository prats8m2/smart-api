import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, MAX_ROW } from '../../../config/config';
import { Account } from '../../db/entity/account.entity';
const listAccounts = async (req: Request, res: Response) => {
	//fetch data from body
	const { limit = MAX_ROW, page = 1 } = req.params as {
		limit?: number;
		page?: number;
	};
	Logger.info(`List account request`);

	//create a user
	const [accounts, count] = await Account.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		relations: ['user', 'user.role'],
		order: {
			id: 'DESC',
		},
		where: {
			status: 1,
		},
	});

	sendResponse(res, true, CODE.SUCCESS, `Account List Data`, {
		count,
		accounts,
	});
};

export default listAccounts;
