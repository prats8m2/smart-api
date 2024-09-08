import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
// import { Device } from '../../db/entity/device.entity';
import { Table } from '../../db/entity/table.entity';
import Logger from '../../utility/logger/logger';
// import RANDOM_NUMBER from '../../utility/randomNumber';
import sendResponse from '../../utility/response';
import { Device } from '../../db/entity/device.entity';

const addTable = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, siteId, deviceId, wifi } = req.body;

	Logger.info(`Add table request`);

	//TODO: Enable for automatic device addition on adding table
	//Create a device
	// const device: Device = new Device();
	// device.code = `DV_${siteId}_${RANDOM_NUMBER(4)}`;
	// device.site = siteId;
	// const newDevice: Device = await device.save();

	//create a table
	let table: Table = new Table();
	table.name = name;
	table.site = siteId;
	table.device = deviceId;
	table.wifis = wifi?.length ? wifi : [];

	const newTable: Table = await table.save();

	//add device id in table
	const device: Device = await Device.findOne(deviceId);
	device.table = newTable;
	await device.save();
	sendResponse(res, true, CODE.SUCCESS, `Table added Successful`, newTable);
};

export default addTable;
