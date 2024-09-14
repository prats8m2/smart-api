import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE, ROLES } from '../../../config/config';
import { Table } from '../../db/entity/table.entity';

const getTable = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	const { account, loggedInRole } = res.locals;
	Logger.info(`Get Table request`);

	//create a user
	const table = await Table.findOne(id, {
		relations: ['device', 'site', 'site.account'],
	});

	if (!table) {
		sendResponse(res, false, CODE.NOT_FOUND, `No table found`);
		return;
	}

	if (table && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (table?.site?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	sendResponse(res, true, CODE.SUCCESS, `Table Data`, table);
};

export default getTable;
