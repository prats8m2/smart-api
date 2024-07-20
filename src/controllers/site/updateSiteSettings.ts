import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import sendResponse from '../../utility/response';

const updateSiteSettings = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, key, value } = req.body;

	const site: any = await Site.findOne(id, {
		relations: ['settings'],
	});
	site.settings[key] = value;

	//update user
	const result = await site.save();
	sendResponse(res, true, CODE.SUCCESS, `Site updated Successful`, result);
};

export default updateSiteSettings;
