import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import Logger from '../../utility/logger/logger';
import RANDOM_NUMBER from '../../utility/randomNumber';
import sendResponse from '../../utility/response';

const addDevice = async (req: Request, res: Response) => {
	//fetch data from body
	const { code, roomId, siteId } = req.body;

	Logger.info(`Add device request`);

	//Create a device
	const device: Device = new Device();
	device.code = code || `DV_${siteId}_${RANDOM_NUMBER(4)}`;
	device.site = siteId;
	device.room = roomId || null;
	const newDevice: Device = await device.save();

	sendResponse(res, true, CODE.SUCCESS, `Device added Successful`, newDevice);
};

export default addDevice;
