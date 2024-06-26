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
	const { name, siteId, deviceId } = req.body;
	console.log('req.body:', req.body);
	const { account } = res.locals;

	if (!name || !siteId || !deviceId) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				name,
				siteId,
				deviceId,
			}
		);
		return;
	}

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

	const isDeviceAssigned = await Room.findOne({ device: deviceId });
	if (isDeviceAssigned) {
		sendResponse(
			res,
			false,
			CODE.CONFLICT,
			`Device is already attached to  Room: ${isDeviceAssigned.name}`,
			isDeviceAssigned
		);
		return;
	} 
	res.locals.action = 'ADD-ROOM';

	next();
};

export default addRoomValidation;
