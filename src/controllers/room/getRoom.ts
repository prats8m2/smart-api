import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, ROLES } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Room } from '../../db/entity/room.entity';

const getRoom = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	const { account, loggedInRole } = res.locals;
	Logger.info(`Get Room request`);

	//create a user
	const room = await Room.findOne(id, {
		relations: ['device', 'site', 'site.account', 'site.wifi', 'wifi'],
	});

	if (!room) {
		sendResponse(res, false, CODE.NOT_FOUND, `No room found`);
		return;
	}

	if (room && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (room?.site?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	sendResponse(res, true, CODE.SUCCESS, `Room Data`, room);
};

export default getRoom;
