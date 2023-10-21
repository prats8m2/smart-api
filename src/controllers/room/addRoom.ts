import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import { Room } from '../../db/entity/room.entity';
import Logger from '../../utility/logger';
import RANDOM_NUMBER from '../../utility/randomNumber';
import sendResponse from '../../utility/response';

const addRoom = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, wifi, siteId } = req.body;

	Logger.info(`Add room request`);

	//Create a device
	const device: Device = new Device();
	device.code = `DV_${siteId}_${RANDOM_NUMBER(4)}`;
	device.site = siteId;
	const newDevice: Device = await device.save();

	//create a room
	let room: Room = new Room();
	room.name = name;
	room.site = siteId;
	room.device = newDevice;
	room.wifi = wifi?.length ? wifi : [];

	const newRoom: Room = await room.save();

	//add device id in room

	sendResponse(res, true, CODE.SUCCESS, `Room added Successful`, newRoom);
};

export default addRoom;
