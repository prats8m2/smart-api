import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';

const getSite = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get site request`);

	//create a user
	const site = await Site.findOne(id, {
		relations: ['account'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Site Data`, site);
};

export default getSite;
