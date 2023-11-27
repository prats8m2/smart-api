import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Room } from '../../db/entity/room.entity';

const getRoom = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get Room request`);

	//create a user
	const room = await Room.findOne(id, {
		relations: ['device', 'site', 'site.account', 'site.wifi', 'wifi'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Room Data`, room);
};

export default getRoom;
