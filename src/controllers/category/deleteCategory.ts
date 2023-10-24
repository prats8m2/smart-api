import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Category } from '../../db/entity/category.entity';
import Logger from '../../utility/logger';
import sendResponse from '../../utility/response';

const deleteCategory = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete category request`);

	//create a user
	const category = await Category.findOne(id);
	const result = await category.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Category Delete`, result);
};

export default deleteCategory;
