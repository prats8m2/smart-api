import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Device } from '../../db/entity/device.entity';
import { Table } from '../../db/entity/table.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const updateTable = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, name, siteId, deviceId, wifi } = req.body;
	const { deviceOldTable } = res.locals;
	let oldTable: Table;
	let oldDevice: Device;
	Logger.info(`Update table request`);
	//get user details
	const table: Table = await Table.findOne(id, { relations: ['device'] });
	console.log('table:', table);

	//update device old table data
	if (deviceOldTable) {
		oldTable = await Table.findOne(deviceOldTable.id);
		oldTable.device = null;
		await oldTable.save();
		oldDevice = await Device.findOne(table?.device?.id);
		oldDevice.table = null;
		await oldDevice.save();
	}

	table.name = name || table.name;
	table.site = siteId;
	table.device = deviceId || table.device;
	table.wifis = wifi?.length ? wifi : [];
	//update user
	const result = await table.save();

	//update device
	const device: Device = await Device.findOne(deviceId);
	device.table = id;
	await device.save();

	if (deviceOldTable) {
		oldTable.device = oldDevice;
		oldDevice.table = oldTable;
		oldDevice.save();
		oldTable.save();
	}
	sendResponse(res, true, CODE.SUCCESS, `Table updated Successful`, result);
};

export default updateTable;
