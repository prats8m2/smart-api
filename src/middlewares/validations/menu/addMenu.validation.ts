import { NextFunction, Request, Response } from 'express';
import { CODE, TYPE } from '../../../../config/config';
import { Menu } from '../../../db/entity/menu.entity';
import sendResponse from '../../../utility/response';

const addMenuValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, type, menuItemsData, scheduleData, site } = req.body;

	if (!name || !type || !menuItemsData || !scheduleData || !site) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				name,
				type,
				menuItemsData,
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

	const isMenuExist = await Menu.findOne({ name, site });
	if (isMenuExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Menu name already exist ', name);
		return;
	}

	res.locals.action = 'ADD-MENU';

	next();
};

export default addMenuValidation;
