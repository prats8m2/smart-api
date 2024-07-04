import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../utility/response';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET_KEY, CODE, ROLES } from '../../../config/config';

// Define a middleware function for authentication.
const AppAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req?.headers?.token?.toString(); // Extract the JWT token from the request headers.
	if (typeof token !== 'undefined') {
		try {
			// Verify the token's authenticity and decode its content.
			const data: any = verify(token, JWT_SECRET_KEY);
			const { roomid, tableId, siteId } = data; // Extract user role and ID from the decoded token.
			res.locals.roomid = roomid; // Store the user's ID in the response object.
			res.locals.tableId = tableId; // Store the user's role in the response object.
			res.locals.siteId = siteId;

			
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
};;

export default AppAuthMiddleware;
