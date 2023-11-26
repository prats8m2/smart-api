import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
const listDevices = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		limit = MAX_ROW,
		page = 1,
		siteId,
	} = req.params as {
		limit?: number;
		page?: number;
		siteId?: number;
	};
	Logger.info(`List device request`);

	//create a user
	const [devices, count] = await Device.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site: siteId,
			status: 1,
		},
		relations: ['site', 'room'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Device List Data`, { count, devices });
};

export default listDevices;
