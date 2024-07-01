import { Request, Response } from 'express';
import { CODE, QR_URL } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import { createToken } from '../../utility/jwt';
import Logger from '../../utility/logger/logger';
import GenerateAlphanumeric from '../../utility/randomAlphaNumeric';
import sendResponse from '../../utility/response';

const createDeviceToken = async (req: Request, res: Response) => {
	//fetch data from query
	const { id } = req.params;

	Logger.info(`Add device request`);

	//fetch device
	const device: Device = await Device.findOne(id, {
		relations: ['room', 'table'],
	});
	if (!device) {
		//no device found
		sendResponse(res, false, CODE.NOT_FOUND, `Device not found`, device);
		return false;
	}

	if (device?.room || device?.table) {
		// Prepare a token object containing user information to generate a JSON Web Token (JWT).
		const tokenObject = {
			sessionId: GenerateAlphanumeric(7),
			room: device?.room?.id,
			table: device?.table?.id,
		};

		// Generate a JWT using the token object.
		const token = createToken(tokenObject);

        res.redirect(`${QR_URL}?token=${token}`)
	} else {
		//no entity attached to device
		sendResponse(res, false, CODE.NOT_FOUND, `Device not assigned`, device);
		return false;
	}

	
};

export default createDeviceToken;
