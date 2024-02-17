import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Category } from '../../db/entity/category.entity';
import ArrangeCategoryI from '../../interface/category/arrangeCategoryI';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const arrangeCategory = async (req: Request, res: Response) => {
	//fetch data from body
	const { categories } = req.body;
	Logger.info(`Arrange category request`);

	await categories.map(async (data: ArrangeCategoryI) => {
		const category: Category = await Category.findOne(data.categoryId);
		category.sequence = data.sequence;
		await category.save();
	});

	sendResponse(res, true, CODE.SUCCESS, `Category re-arranged Successful`);
};

export default arrangeCategory;
