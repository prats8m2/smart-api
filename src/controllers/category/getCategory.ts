import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, ROLES } from '../../../config/config';
import { Category } from '../../db/entity/category.entity';

const getCategory = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	const { account, loggedInRole } = res.locals;
	Logger.info(`Get Category request`);

	//create a user
	const category = await Category.findOne(id, {
		relations: ['site', 'site.account', 'schedule', 'products'],
	});

	if (!category) {
		sendResponse(res, false, CODE.NOT_FOUND, `No category found`);
		return;
	}

	if (category && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (category?.site?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	sendResponse(res, true, CODE.SUCCESS, `Category Data`, category);
};

export default getCategory;
