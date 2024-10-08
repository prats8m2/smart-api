import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, ROLES } from '../../../config/config';
import { Site } from '../../db/entity/site.entity';
import DECRYPT from '../../utility/decrypt';

const getSite = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get site request`);
	const { account, loggedInRole } = res.locals;

	//create a user
	const site = await Site.findOne(id, {
		relations: ['account', 'wifi', 'settings', 'events', 'events.schedule'],
	});

	if (!site) {
		sendResponse(res, false, CODE.NOT_FOUND, `No site found`);
		return;
	}

	if (site && loggedInRole && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (site?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	let decryptedWifi: any;
	if (site && site.wifi && Array.isArray(site.wifi)) {
		// Decrypt WiFi passwords
		if (site && site.wifi && Array.isArray(site.wifi)) {
			// Create a new property for decrypted WiFi data
			decryptedWifi = site.wifi.map((wifi) => ({
				...wifi,
				password: DECRYPT(wifi.password),
			}));
		}
	}

	delete site.wifi;
	site.wifi = decryptedWifi;

	sendResponse(res, true, CODE.SUCCESS, `Site Data`, site);
};

export default getSite;
