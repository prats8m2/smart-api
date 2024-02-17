import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { Menu } from '../../db/entity/menu.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
const listMenus = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		limit = MAX_ROW,
		page = 1,
		site,
	} = req.params as {
		limit?: number;
		page?: number;
		site?: string;
	};
	Logger.info(`List menu request`);

	const [menus, count] = await Menu.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site,
		},
	});

	sendResponse(res, true, CODE.SUCCESS, `Menu List Data`, {
		count,
		menus,
	});
};

export default listMenus;
