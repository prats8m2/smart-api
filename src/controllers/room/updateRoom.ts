import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Room } from '../../db/entity/room.entity';
import { Wifi } from '../../db/entity/wifi.entity';
import Logger from '../../utility/logger';
import sendResponse from '../../utility/response';

const updateRoom = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, name, wifi, siteId } = req.body;
	const allWifi: Wifi[] = [];
	Logger.info(`Update room request`);

	//get user details
	const room: Room = await Room.findOne(id);

	room.name = name || room.name;
	room.site = siteId;
	room.wifi = wifi || room.wifi;

	//update user
	const result = await room.save();
	sendResponse(res, true, CODE.SUCCESS, `Room updated Successful`, result);
};

export default updateRoom;
