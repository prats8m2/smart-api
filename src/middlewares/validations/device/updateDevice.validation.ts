import { NextFunction, Request, Response } from 'express';
import { Not } from 'typeorm';
import { CODE } from '../../../../config/config';
import { Site } from '../../../db/entity/site.entity';
import sendResponse from '../../../utility/response';
import { Room } from '../../../db/entity/room.entity';
import { Device } from '../../../db/entity/device.entity';

const updateDeviceValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, code, siteId, roomId } = req.body;

	if (!id) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{ id }
		);
		return;
	}

	if (code) {
		const isDeviceExist = await Device.findOne({
			code,
			id: Not(id),
			site: siteId,
		});
		if (isDeviceExist) {
			sendResponse(res, false, CODE.CONFLICT, 'Code already exist ', code);
			return;
		}
	}

	if (roomId) {
		const isRoomAssigned = await Device.findOne({
			room: roomId,
			id: Not(id),
		});
		if (isRoomAssigned) {
			res.locals.oldRoomDevice = isRoomAssigned;
		}
	}

	res.locals.action = 'UPDATE-DEVICE';

	next();
};

export default updateDeviceValidation;
