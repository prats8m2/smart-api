import { Request, Response } from 'express';
import { CODE, MAX_ROW } from '../../../config/config';
import { Table } from '../../db/entity/table.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
const listTables = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		limit = MAX_ROW,
		page = 1,
		siteId,
	} = req.params as {
		limit?: number;
		page?: number;
		siteId?: number;
	};
	Logger.info(`List table request`);

	//create a user
	const [tables, count] = await Table.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site: siteId,
		},
		relations: ['device'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Site List Data`, { count, tables });
};

export default listTables;
