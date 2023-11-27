import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { Table } from '../../../db/entity/table.entity';

const addTableValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, siteId, deviceId } = req.body;
	console.log('req.body:', req.body);
	const { account } = res.locals;

	if (!name || !siteId || !deviceId) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				name,
				siteId,
				deviceId,
			}
		);
		return;
	}

	if (!account) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Account is required to add site',
			{ account }
		);
		return;
	}
	const isNameExist = await Table.findOne({ name, site: siteId });
	if (isNameExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Table name already exist ', name);
		return;
	}

	const isDeviceAssigned = await Table.findOne({ device: deviceId });
	if (isDeviceAssigned) {
		sendResponse(
			res,
			false,
			CODE.CONFLICT,
			`Device is already attached to  Table: ${isDeviceAssigned.name}`,
			isDeviceAssigned
		);
		return;
	}
	res.locals.action = 'ADD-TABLE';

	next();
};

export default addTableValidation;
