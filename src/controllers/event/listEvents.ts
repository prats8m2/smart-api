import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { Events } from '../../db/entity/event.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const listEvents = async (req: Request, res: Response) => {
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
	Logger.info(`Events list request`);

	const [events,count] = await Events.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site: siteId
		},
		relations: ['schedule'],
	});
	sendResponse(
		res,
		true,
		CODE.SUCCESS,
		`Event Data`,
		{	count,
			events
		}
	);
};

export default listEvents;
