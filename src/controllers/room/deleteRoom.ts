import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Room } from '../../db/entity/room.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const deleteRoom = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete Room request`);

	//create a user
	const room = await Room.findOne(id);
	const result = await room.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Room Delete`, result);
};

export default deleteRoom;
