import { NextFunction, Request, Response } from 'express';
import { Not } from 'typeorm';
import { CODE } from '../../../../config/config';
import { Site } from '../../../db/entity/site.entity';
import sendResponse from '../../../utility/response';
import { Room } from '../../../db/entity/room.entity';

const updateRoomValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, name, siteId } = req.body;

	if (!id || !siteId) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{ id, siteId }
		);
		return;
	}

	if (name) {
		const isNameExist = await Room.findOne({ name, id: Not(id), site: siteId });
		if (isNameExist) {
			sendResponse(res, false, CODE.CONFLICT, 'Name already exist ', name);
			return;
		}
	}

	res.locals.action = 'UPDATE-ROOM';

	next();
};

export default updateRoomValidation;
