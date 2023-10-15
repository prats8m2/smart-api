import { Request, Response, NextFunction } from "express";
import sendResponse from "../../utility/response";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY, CODE, ROLES } from '../../../config/config';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req?.headers?.token?.toString();
	if (typeof token !== 'undefined') {
		try {
			const data: any = verify(token, JWT_SECRET_KEY);
			const { role, id } = data;
			let { account } = data;
			res.locals.loggedInId = id;
			res.locals.loggedInRole = role;
			if (!account) {
				account =
					req.body.accountId || req.query.accountId || req.params.accountId;
			}
			res.locals.account = account;

			next();
		} catch (_e) {
			const e: Error = _e;

			if (e.message === 'invalid signature') {
				sendResponse(
					res,
					false,
					CODE.UNAUTHORIZED,
					'Invalid reset password token!'
				);
				return false;
			}

			if (e.message === 'jwt expired') {
				sendResponse(res, false, CODE.UNAUTHORIZED, 'Session expired!');
				return false;
			}

			sendResponse(res, false, CODE.UNAUTHORIZED, e.message);
		}
	} else {
		sendResponse(res, false, CODE.UNAUTHORIZED, 'Not Authorized');
	}
};

export default AuthMiddleware;
