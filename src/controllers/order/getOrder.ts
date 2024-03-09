import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { Category } from '../../db/entity/category.entity';

const getCategory = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get Category request`);

	//create a user
	const category = await Category.findOne(id, {
		relations: ['site', 'site.account', 'schedule', 'products'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Category Data`, category);
};

export default getCategory;
