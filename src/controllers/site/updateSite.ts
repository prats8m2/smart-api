import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';

const updateSite = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, name, address } = req.body;
	Logger.info(`Update site request`);

	//get user details
	const site: Site = await Site.findOne(id);

	site.name = name ? name : site.name;
	site.address = address ? address : site.address;

	//update user
	const result = await site.save();
	sendResponse(res, true, CODE.SUCCESS, `Site updated Successful`, result);
};

export default updateSite;
