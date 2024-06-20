import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, MAX_ROW, ROLES } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { User } from '../../db/entity/user.entity';
const listSites = async (req: Request, res: Response) => {
	//fetch data from body
	const { limit = MAX_ROW, page = 1 } = req.params as {
		limit?: number;
		page?: number;
	};
	const { account, loggedInId, loggedInRole } = res.locals;
	Logger.info(`List site request`);

	let sites: Site[];
	let count: number;

	//Fetch sites for super admin & owner
	if (
		loggedInRole.name === ROLES.SUPER_ADMIN ||
		loggedInRole.name === ROLES.OWNER
	) {
		[sites, count] = await Site.findAndCount({
			take: limit,
			skip: (page - 1) * limit,
			where: {
				account,
			},
			relations: ['account'],
		});
	}
	//Fetch sites for staff
	else {
		const userDetails: User = await User.findOne(loggedInId, {
			relations: ['sites'],
		});
		sites = userDetails.sites;
		count = sites.length;
	}

	sendResponse(res, true, CODE.SUCCESS, `Site List Data`, { count, sites });
};

export default listSites;
