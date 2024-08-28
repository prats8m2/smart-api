import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Wifi } from '../../db/entity/wifi.entity';
import ENCRYPT from '../../utility/encrypt';
import { Site_Settings } from '../../db/entity/site_settings.entity';

const addSite = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, type, address, wifiDetails } = req.body;
	const { account } = res.locals;
	const allWifi: Wifi[] = [];
	Logger.info(`Add site request`);

	if (wifiDetails?.length) {
		//adding wifi details
		for (let index = 0; index < wifiDetails.length; index++) {
			const { username, password } = wifiDetails[index];
			const siteWifi: Wifi = new Wifi();
			siteWifi.username = username;
			siteWifi.password = ENCRYPT(password);
			const newSiteWifi = await siteWifi.save();
			allWifi.push(newSiteWifi);
		}
	}

	//create a new site settings
	let settings: Site_Settings = new Site_Settings();
	const settingsResult = await settings.save();
	//create an account
	let site: Site = new Site();
	site.name = name;
	site.type = type;
	site.address = address;
	site.account = account;
	site.wifi = allWifi;
	site.settings = settingsResult;

	const result = await site.save();
	sendResponse(res, true, CODE.SUCCESS, `Site added Successful`, result);
};

export default addSite;
