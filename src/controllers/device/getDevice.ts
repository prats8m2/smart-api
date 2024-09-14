import { Request, Response } from 'express';
import { CODE, ROLES } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import GET_CURRENT_TIME from '../../utility/getCurrentTime';

const getDevice = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	const { account, loggedInRole } = res.locals;
	Logger.info(`Get Device request`);

	//create a user
	const device = await Device.findOne(id, {
		relations: ['site', 'room', 'site.account'],
	});

	if (!device) {
		sendResponse(res, false, CODE.NOT_FOUND, `No device found`);
		return;
	}

	if (device && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (device?.site?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	Logger.http(GET_CURRENT_TIME());

	sendResponse(res, true, CODE.SUCCESS, `Device Data`, { device });
};

export default getDevice;
