import { Request, Response } from 'express';
import { CODE, QR_URL, SESSION_STATUS } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import { createToken } from '../../utility/jwt';
import Logger from '../../utility/logger/logger';
import GenerateAlphanumeric from '../../utility/randomAlphaNumeric';
import sendResponse from '../../utility/response';
import { Session } from '../../db/entity/session.entity';

const createDeviceToken = async (req: Request, res: Response) => {
	//fetch data from query
	const { id } = req.params;

	Logger.info(`Add device request`);

	//fetch device
	const device: Device = await Device.findOne(id, {
		relations: ['room', 'table', 'site', 'site.settings'],
	});
	if (!device) {
		//no device found
		sendResponse(res, false, CODE.NOT_FOUND, `Device not found`, device);
		return false;
	}

	if (device?.room || device?.table) {
		const sessionId: string = GenerateAlphanumeric(7);
		// Prepare a token object containing user information to generate a JSON Web Token (JWT).
		const tokenObject = {
			sessionId,
			roomId: device?.room?.id,
			tableId: device?.table?.id,
			siteId: device?.site?.id,
			isActive: SESSION_STATUS.ACTIVE,
			settings: device?.site?.settings,
		};

		// Generate a JWT using the token object.
		const token = createToken(tokenObject);

		const session: Session = new Session();

		//saving session information
		session.sessionId = sessionId;
		session.site = device.site;
		session.token = token;
		session.type = device?.room?.id ? 1 : 2;
		session.room = device?.room?.id ? device?.room : null;
		session.table = device?.table?.id ? device?.table : null;
		session.isActive = SESSION_STATUS.ACTIVE;

		session.save();

		console.log(`${QR_URL}?token=${token}`);

		res.redirect(`${QR_URL}?token=${token}`);
	} else {
		//no entity attached to device
		sendResponse(res, false, CODE.NOT_FOUND, `Device not assigned`, device);
		return false;
	}
};

export default createDeviceToken;
