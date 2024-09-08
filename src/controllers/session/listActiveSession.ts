import { Request, Response } from 'express';
import { CODE, MAX_ROW, SESSION_STATUS } from '../../../config/config';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { Session } from '../../db/entity/session.entity';
const listActiveSessions = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		limit = MAX_ROW,
		page = 1,
		site,
		type,
	} = req.params as {
		limit?: number;
		page?: number;
		site?: string;
		type?: number;
	};
	Logger.info(`List session request`);

	console.log(limit, page, site, type);

	//get list of all sessions
	const [sessions, count] = await Session.findAndCount({
		take: limit,
		skip: (page - 1) * limit,
		where: {
			site,
			type,
			isActive: SESSION_STATUS.ACTIVE,
		},
		relations: ['room', 'table'],
	});

	sendResponse(res, true, CODE.SUCCESS, `Sessions List Data`, {
		count,
		sessions,
	});
};

export default listActiveSessions;
