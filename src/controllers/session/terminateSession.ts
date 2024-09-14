import { Request, Response } from 'express';
import { CODE, ROLES, SESSION_STATUS } from '../../../config/config';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { Session } from '../../db/entity/session.entity';

const terminateUserSession = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.body;
	const { account, loggedInRole } = res.locals;
	Logger.info(`Terminating user session`);

	const session: Session = await Session.findOne(id, {
		relations: ['site', 'site.account'],
	});

	if (!session) {
		sendResponse(res, false, CODE.NOT_FOUND, `No Session found`);
		return;
	}

	if (session && loggedInRole.name !== ROLES.SUPER_ADMIN) {
		if (session?.site?.account?.id != account?.id) {
			sendResponse(res, false, CODE.FORBIDDEN, `Not authorized`);
			return;
		}
	}

	session.isActive = SESSION_STATUS.IN_ACTIVE;
	session.token = null;
	await session.save();
	sendResponse(
		res,
		true,
		CODE.SUCCESS,
		`User session terminated successfully`,
		id
	);
	return;
};

export default terminateUserSession;
