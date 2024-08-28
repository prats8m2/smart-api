import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import sendResponse from '../../utility/response';

/**
 * Update the site settings based on the provided key and value.
 * @param req - The request object containing the site update data.
 * @param res - The response object to send the result back.
 */
const updateSiteSettings = async (req: Request, res: Response) => {
	// Fetch data from body
	const { id, key, value } = req.body;

	// Find the site with the given id and its settings
	const site: any = await Site.findOne(id, {
		relations: ['settings'],
	});

	// Update the site settings with the new value for the specified key
	site.settings[key] = value;

	// Save the updated site
	const result = await site.settings.save();

	// Send a response indicating the success of the site update
	sendResponse(res, true, CODE.SUCCESS, `Site updated Successful`, result);
};

export default updateSiteSettings;
