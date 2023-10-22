import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import Logger from '../../utility/logger';
import sendResponse from '../../utility/response';
const listAvailableDevices = async (req: Request, res: Response) => {
	//fetch data from body
	const { siteId } = req.params as {
		siteId?: number;
	};
	Logger.info(`List device request`);

	//create a user
	const [devices, count] = await Device.findAndCount({
		where: {
			site: siteId,
			room: null,
		},
		relations: ['site', 'room'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Available Device List Data`, {
		count,
		devices,
	});
};

export default listAvailableDevices;
