import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { Table } from '../../db/entity/table.entity';

const getTable = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get Table request`);

	//create a user
	const table = await Table.findOne(id, {
		relations: ['device', 'site', 'site.account'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Table Data`, table);
};

export default getTable;
