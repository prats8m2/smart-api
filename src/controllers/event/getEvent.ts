import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Events } from '../../db/entity/event.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const getEvent = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Event Get request`);

	const eventDetails: Events = await Events.findOne(id,{relations:['schedule']});
	sendResponse(
		res,
		true,
		CODE.SUCCESS,
		`Event Data`,
		eventDetails
	);
};

export default getEvent;
