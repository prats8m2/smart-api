import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import Logger from '../../utility/logger';
import sendResponse from '../../utility/response';
import GET_CURRENT_TIME from '../../utility/getCurrentTime';

const getDevice = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get Device request`);

	//create a user
	const device = await Device.findOne(id, {
		relations: ['site', 'room'],
	});

	Logger.http(GET_CURRENT_TIME());

	sendResponse(res, true, CODE.SUCCESS, `Device Data`, { device });
};

export default getDevice;
