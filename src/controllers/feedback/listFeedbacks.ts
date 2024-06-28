import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { Feedback } from '../../db/entity/feedback.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const listFeedbacks = async (req: Request, res: Response) => {
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
	Logger.info(`Feedback list request`);

	const [feedbacks,count] = await Feedback.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site: siteId
		},
	});
	sendResponse(res, true, CODE.SUCCESS, `Feedback Data`, { count, feedbacks });
};

export default listFeedbacks;
