import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Room } from '../../db/entity/room.entity';
import { Wifi } from '../../db/entity/wifi.entity';
import Logger from '../../utility/logger';
import sendResponse from '../../utility/response';
import { Device } from '../../db/entity/device.entity';

const updateRoom = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, name, wifi, siteId, deviceId } = req.body;
	const { deviceOldRoom } = res.locals;
	const allWifi: Wifi[] = [];
	let oldRoom: Room;
	let oldDevice: Device;
	Logger.info(`Update room request`);
	//get user details
	const room: Room = await Room.findOne(id, { relations: ['device'] });
	console.log('room:', room);

	//update device old room data
	if (deviceOldRoom) {
		oldRoom = await Room.findOne(deviceOldRoom.id);
		oldRoom.device = null;
		await oldRoom.save();
		oldDevice = await Device.findOne(room?.device?.id);
		oldDevice.room = null;
		await oldDevice.save();
	}

	room.name = name || room.name;
	room.site = siteId;
	room.wifi = wifi || room.wifi;
	room.device = deviceId || room.device;
	//update user
	const result = await room.save();

	//update device
	const device: Device = await Device.findOne(deviceId);
	device.room = id;
	await device.save();

	if (deviceOldRoom) {
		oldRoom.device = oldDevice;
		oldDevice.room = oldRoom;
		oldDevice.save();
		oldRoom.save();
	}
	sendResponse(res, true, CODE.SUCCESS, `Room updated Successful`, result);
};

export default updateRoom;
