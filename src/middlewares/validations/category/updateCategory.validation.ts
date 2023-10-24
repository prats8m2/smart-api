import { NextFunction, Request, Response } from 'express';
import { CODE, TYPE } from '../../../../config/config';
import { Category } from '../../../db/entity/category.entity';
import sendResponse from '../../../utility/response';
import { Not } from 'typeorm';

const updateCategoryValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, name, type, sequence, scheduleData, site } = req.body;

	if (!id || !name || !type || !sequence || !scheduleData || !site) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				id,
				name,
				type,
				sequence,
				scheduleData,
				site,
			}
		);
		return;
	}

	if (type !== TYPE.AMENITIES && type !== TYPE.FOOD) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid type', {
			type,
		});
		return;
	}

	const isCategoryExist = await Category.findOne({ name, site, id: Not(id) });
	if (isCategoryExist) {
		sendResponse(
			res,
			false,
			CODE.CONFLICT,
			'Category name already exist ',
			name
		);
		return;
	}

	res.locals.action = 'UPDATE-CATEGORY';

	next();
};

export default updateCategoryValidation;
