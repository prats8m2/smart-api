import { CODE, SESSION_STATUS } from '../../../config/config';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utility/response';
import { Session } from '../../db/entity/session.entity';

// Define a middleware function for user session check.
const UserSessionMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { sessionId } = res.locals;

	if (sessionId) {
		const session: Session = await Session.findOne({ where: { sessionId } });
		if (
			session &&
			session?.isActive === SESSION_STATUS.ACTIVE &&
			session?.token
		) {
			next();
		} else {
			sendResponse(res, false, CODE.UNAUTHORIZED, 'Session expired');
			return false;
		}
	} else {
		sendResponse(res, false, CODE.UNAUTHORIZED, 'Invalid token!');
		return false;
	}
};

export default UserSessionMiddleware;
