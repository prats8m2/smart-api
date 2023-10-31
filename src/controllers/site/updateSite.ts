import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import { Wifi } from '../../db/entity/wifi.entity';
import ENCRYPT from '../../utility/encrypt';

const updateSite = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, name, address, wifiDetails } = req.body;
	const allWifi: Wifi[] = [];
	Logger.info(`Update site request`);

	//get user details
	const site: Site = await Site.findOne(id);

	for (let index = 0; index < wifiDetails.length; index++) {
		const { id, username, password } = wifiDetails[index];
		if (!id) {
			// for new wifi
			const wifi: Wifi = new Wifi();
			wifi.username = username;
			wifi.password = password;
			const newWifi = await wifi.save();
			allWifi.push(newWifi);
		} else {
			//update password for ols wifi
			const wifi = await Wifi.findOne(id);
			wifi.username = username || wifi.username;
			wifi.password = password ? ENCRYPT(password) : wifi.password;
			const newWifi = await wifi.save();
			allWifi.push(newWifi);
		}
	}
	site.name = name ? name : site.name;
	site.address = address ? address : site.address;
	site.wifi = allWifi;

	//update user
	const result = await site.save();
	sendResponse(res, true, CODE.SUCCESS, `Site updated Successful`, result);
};

export default updateSite;
