import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';

const addSite = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, type, address, accountId } = req.body;
	const { account } = res.locals;
	Logger.info(`Add site request`);

	//create an account
	const site: Site = new Site();
	site.name = name;
	site.type = type;
	site.address = address;
	site.account = account ? account : accountId;

	const result = await site.save();
	sendResponse(res, true, CODE.SUCCESS, `Site added Successful`, result);
};

export default addSite;
