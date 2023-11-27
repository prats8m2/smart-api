import { NextFunction, Request, Response } from 'express';
import { Not } from 'typeorm';
import { CODE } from '../../../../config/config';
import sendResponse from '../../../utility/response';
import { Table } from '../../../db/entity/table.entity';

const updateTableValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, name, siteId, deviceId } = req.body;

	if (!id || !siteId || !deviceId) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{ id, siteId, deviceId }
		);
		return;
	}

	if (name) {
		const isNameExist = await Table.findOne({
			name,
			id: Not(id),
			site: siteId,
		});
		if (isNameExist) {
			sendResponse(res, false, CODE.CONFLICT, 'Name already exist ', name);
			return;
		}
	}

	const isDeviceAssigned = await Table.findOne({
		device: deviceId,
		id: Not(id),
	});
	if (isDeviceAssigned) {
		res.locals.deviceOldTable = isDeviceAssigned;
	}

	res.locals.action = 'UPDATE-TABLE';

	next();
};

export default updateTableValidation;
