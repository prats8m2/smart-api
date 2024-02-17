import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { isInstanceOfInterfaceArrangeCategory } from '../../../utility/isInstanceOfInterface';

const arrangeCategoryValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { categories } = req.body;

	// if (!isInstanceOfInterfaceArrangeCategory(categories)) {
	// 	sendResponse(
	// 		res,
	// 		false,
	// 		CODE.BAD_REQUEST,
	// 		'Please check data of categories',
	// 		{ categories }
	// 	);
	// 	return;
	// }

	res.locals.action = 'UPDATE-CATEGORY';

	next();
};

export default arrangeCategoryValidation;
