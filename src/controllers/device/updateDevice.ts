import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import { Room } from '../../db/entity/room.entity';
import { Wifi } from '../../db/entity/wifi.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const updateDevice = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, code, siteId, roomId, status } = req.body;
	const { oldRoomDevice } = res.locals;
	console.log('oldRoomDevice:', oldRoomDevice);
	const allWifi: Wifi[] = [];
	let oldDevice: Device;
	let oldRoom: Room;
	Logger.info(`Update device request`);

	//get user details
	const device: Device = await Device.findOne(id, { relations: ['room'] });

	//update room old device data
	if (oldRoomDevice) {
		oldDevice = await Device.findOne(oldRoomDevice.id);
		oldDevice.room = null;
		await oldDevice.save();
		oldRoom = await Room.findOne(device?.room?.id);
		oldRoom.device = null;
		await oldRoom.save();
	}

	device.code = code || device.code;
	device.site = siteId;
	device.room = roomId || device.room;
	device.status = status;

	//update user
	const result = await device.save();

	const room: Room = await Room.findOne(roomId);
	room.device = result;
	await room.save();

	if (oldRoomDevice) {
		oldDevice.room = oldRoom;
		oldRoom.device = oldDevice;
		oldDevice.save();
		oldRoom.save();
	}
	sendResponse(res, true, CODE.SUCCESS, `Device updated Successful`, result);
};

export default updateDevice;
