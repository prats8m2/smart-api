import { NextFunction, Request, Response } from 'express';
import { CODE, TYPE } from '../../../../config/config';
import sendResponse from '../../../utility/response';
import { Not } from 'typeorm';
import { Menu } from '../../../db/entity/menu.entity';

const updateMenuValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, name, type, menuItemsData, scheduleData, site } = req.body;

	if (!id || !name || !type || !menuItemsData || !scheduleData || !site) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				id,
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

	const isMenuExist = await Menu.findOne({ name, site, id: Not(id) });
	if (isMenuExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Menu name already exist ', name);
		return;
	}

	res.locals.action = 'UPDATE-MENU';

	next();
};

export default updateMenuValidation;
