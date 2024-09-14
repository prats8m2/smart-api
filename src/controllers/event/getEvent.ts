import { Request, Response } from 'express';
import { CODE, ROLES } from '../../../config/config';
import { Events } from '../../db/entity/event.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const getEvent = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	const { account, loggedInRole } = res.locals;
	Logger.info(`Event Get request`);

	const eventDetails: Events = await Events.findOne(id, {
		relations: ['site', 'site.account', 'schedule'],
	});

	if (!eventDetails) {
		sendResponse(res, false, CODE.NOT_FOUND, `No event found`);
		return;
	}

	if (eventDetails && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (eventDetails?.site?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	sendResponse(res, true, CODE.SUCCESS, `Event Data`, eventDetails);
};

export default getEvent;
