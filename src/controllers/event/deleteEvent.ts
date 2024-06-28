import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Events } from '../../db/entity/event.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const deleteEvent = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete Event request`);
	
	const events = await Events.findOne(id);
	const result = await events.softRemove();

	sendResponse(res, true, CODE.SUCCESS, `Event Deleted Successfully`, result);
};

export default deleteEvent;
