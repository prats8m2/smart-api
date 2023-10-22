import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
// import { Device } from '../../db/entity/device.entity';
import { Room } from '../../db/entity/room.entity';
import Logger from '../../utility/logger';
// import RANDOM_NUMBER from '../../utility/randomNumber';
import sendResponse from '../../utility/response';
import { Device } from '../../db/entity/device.entity';

const addRoom = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, wifi, siteId, deviceId } = req.body;

	Logger.info(`Add room request`);

	//TODO: Enable for automatic device addition on adding room
	//Create a device
	// const device: Device = new Device();
	// device.code = `DV_${siteId}_${RANDOM_NUMBER(4)}`;
	// device.site = siteId;
	// const newDevice: Device = await device.save();

	//create a room
	let room: Room = new Room();
	room.name = name;
	room.site = siteId;
	room.device = deviceId;
	room.wifi = wifi?.length ? wifi : [];

	const newRoom: Room = await room.save();

	//add device id in room
	const device: Device = await Device.findOne(deviceId);
	device.room = newRoom;
	await device.save();
	sendResponse(res, true, CODE.SUCCESS, `Room added Successful`, newRoom);
};;;;;

export default addRoom;
