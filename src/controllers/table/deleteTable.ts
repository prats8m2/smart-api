import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Table } from '../../db/entity/table.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const deleteTable = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete Table request`);

	//create a user
	const table = await Table.findOne(id);
	const result = await table.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Table Delete`, result);
};

export default deleteTable;
