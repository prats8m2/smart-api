import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE, SITE_TYPE } from '../../../../config/config';
import { Site } from '../../../db/entity/site.entity';
import { Room } from '../../../db/entity/room.entity';
import { Device } from '../../../db/entity/device.entity';

const addDeviceValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { code, siteId } = req.body;
	console.log('req.body:', req.body);
	const { account } = res.locals;

	if (!code || !siteId) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				code,
				siteId,
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
	const isCodeExist = await Device.findOne({ code, site: siteId });
	if (isCodeExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Room name already exist ', name);
		return;
	}

	res.locals.action = 'ADD-DEVICE';

	next();
};

export default addDeviceValidation;
