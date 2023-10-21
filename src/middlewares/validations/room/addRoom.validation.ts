import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE, SITE_TYPE } from '../../../../config/config';
import { Site } from '../../../db/entity/site.entity';
import { Room } from '../../../db/entity/room.entity';

const addRoomValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, siteId } = req.body;
	console.log('req.body:', req.body);
	const { account } = res.locals;

	if (!name || !siteId) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				name,
				siteId,
			}
		);
		return;
	}

	console.log('account:', account);
	if (!account) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Account is required to add site',
			{ account }
		);
		return;
	}
	const isNameExist = await Room.findOne({ name, site: siteId });
	if (isNameExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Room name already exist ', name);
		return;
	}

	res.locals.action = 'ADD-ROOM';

	next();
};

export default addRoomValidation;
