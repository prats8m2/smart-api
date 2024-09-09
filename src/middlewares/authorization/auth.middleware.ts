import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../utility/response';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET_KEY, CODE, ROLES } from '../../../config/config';

// Define a middleware function for authentication.
const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req?.headers?.token?.toString(); // Extract the JWT token from the request headers.
	if (typeof token !== 'undefined') {
		try {
			// Verify the token's authenticity and decode its content.
			const data: any = verify(token, JWT_SECRET_KEY);
			const { role, id, roomId, tableId, siteId, sessionId } = data; // Extract user role and ID from the decoded token.
			console.log('sessionId', sessionId);
			let { account } = data; // Extract user's associated account from the token.
			res.locals.loggedInId = id; // Store the user's ID in the response object.
			res.locals.loggedInRole = role; // Store the user's role in the response object.
			res.locals.room = roomId; // Store the user's role in the response object.
			res.locals.table = tableId; // Store the user's role in the response object.
			res.locals.site = siteId; // Store the user's role in the response object.
			res.locals.sessionId = sessionId; // Store the user's role in the response object.

			// If no account is provided in the token, attempt to extract it from request parameters.
			if (!account) {
				account =
					req.body.accountId || req.query.accountId || req.params.accountId;
			}
			res.locals.account = account; // Store the account in the response object.

			next(); // Continue to the next middleware or route handler.
		} catch (_e) {
			const e: Error = _e;

			// Handle JWT verification errors.

			if (e.message === 'invalid signature') {
				sendResponse(res, false, CODE.UNAUTHORIZED, 'Invalid token!');
				return false;
			}

			if (e.message === 'jwt expired') {
				sendResponse(res, false, CODE.UNAUTHORIZED, 'Session expired!');
				return false;
			}

			sendResponse(res, false, CODE.UNAUTHORIZED, e.message);
		}
	} else {
		// If there's no token provided, respond with an "Not Authorized" error.
		sendResponse(res, false, CODE.UNAUTHORIZED, 'Not Authorized');
	}
};

export default AuthMiddleware;
