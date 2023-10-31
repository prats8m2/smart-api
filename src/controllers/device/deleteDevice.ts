import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import { Room } from '../../db/entity/room.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const deleteDevice = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete Device request`);

	const room: Room = await Room.findOne({ where: [{ device: id }] });

	if (room) {
		sendResponse(res, false, CODE.CONFLICT, 'Device is added to a room', room);
	}

	//create a user
	const device = await Device.findOne(id);
	const result = await device.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Device Delete`, result);
};

export default deleteDevice;
