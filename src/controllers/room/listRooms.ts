import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { Room } from '../../db/entity/room.entity';
import Logger from '../../utility/logger';
import sendResponse from '../../utility/response';
const listRooms = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		limit = MAX_ROW,
		page = 1,
		siteId,
	} = req.params as {
		limit?: number;
		page?: number;
		siteId?: number;
	};
	Logger.info(`List room request`);

	//create a user
	const [rooms, count] = await Room.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site: siteId,
		},
		relations: ['device'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Site List Data`, { count, rooms });
};

export default listRooms;
