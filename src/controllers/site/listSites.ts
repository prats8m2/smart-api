import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, MAX_ROW, ROLES } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
const listSites = async (req: Request, res: Response) => {
	//fetch data from body
	const { limit = MAX_ROW, page = 1 } = req.params as {
		limit?: number;
		page?: number;
	};
	const { account } = res.locals;
	Logger.info(`List site request`);

	//create a user
	const [sites, count] = await Site.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			account,
		},
		relations: ['account'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Site List Data`, { count, sites });
};

export default listSites;
