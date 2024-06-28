import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Events } from '../../db/entity/event.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { Feedback } from '../../db/entity/feedback.entity';

const deleteFeedback = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete Feedack request`);
	
	const feedback = await Feedback.findOne(id);
	const result = await feedback.softRemove();

	sendResponse(res, true, CODE.SUCCESS, `Feedback Deleted Successfully`, result);
};

export default deleteFeedback;
