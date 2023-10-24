import { NextFunction, Request, Response } from 'express';
import { CODE, TYPE } from '../../../../config/config';
import { Category } from '../../../db/entity/category.entity';
import sendResponse from '../../../utility/response';

const addCategoryValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, type, sequence, scheduleData, site } = req.body;
	const { account } = res.locals;

	if (!name || !type || !sequence || !scheduleData || !site) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
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

	const isCategoryExist = await Category.findOne({ name, site });
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

	// if (!(schedule instanceof Schedule)) {
	// 	sendResponse(res, false, CODE.BAD_REQUEST, 'Schedule body error', schedule);
	// 	return;
	// }
	res.locals.action = 'ADD-CATEGORY';

	next();
};

export default addCategoryValidation;
