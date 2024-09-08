import { Request, Response } from 'express';
import { CODE, SESSION_STATUS } from '../../../config/config';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { Session } from '../../db/entity/session.entity';

const terminateUserSession = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.body;
	Logger.info(`Terminating user session`);

	const session: Session = await Session.findOne(id);

	//update isActive
	if (session) {
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
	} else {
		sendResponse(res, false, CODE.NOT_FOUND, `No active session found`, id);
	}
};

export default terminateUserSession;
