import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { Category } from '../../db/entity/category.entity';
import Logger from '../../utility/logger';
import sendResponse from '../../utility/response';
const listCategories = async (req: Request, res: Response) => {
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
	Logger.info(`List category request`);

	//create a user
	const [categories, count] = await Category.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site,
		},
		relations: ['site'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Category List Data`, {
		count,
		categories,
	});
};

export default listCategories;
