import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';

const deleteSite = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete site request`);

	//create a user
	const site = await Site.findOne(id);
	const result = await site.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Site Delete`, result);
};

export default deleteSite;
