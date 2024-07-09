import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { User } from '../../db/entity/user.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { Account } from '../../db/entity/account.entity';
const listUsersToAssign = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		limit = MAX_ROW,
		page = 1,
		siteId,
	} = req.params as {
		limit?: number;
		page?: number;
		siteId?: number;
	};

	const { account } = res.locals as {
		account?: Account
	};
	Logger.info(`List user assign request`);
	const queryBuilder = User.createQueryBuilder('user')
		.leftJoin('user.sites', 'site')
		.where('user.account = :account', { account: account.id })
		.orWhere('site.id = :siteId', { siteId })
		.andWhere('user.status = :status', { status: 1 })
		.orderBy('user.firstName', 'DESC')
		.addOrderBy('user.lastName', 'DESC')
		.take(limit)
		.skip((page - 1) * limit);

	const [users, count] = await queryBuilder.getManyAndCount();

	sendResponse(res, true, CODE.SUCCESS, `Assign User List Data`, { count, users });
};

export default listUsersToAssign;
