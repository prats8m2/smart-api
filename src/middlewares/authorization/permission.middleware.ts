import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../utility/response';
import { CODE } from '../../../config/config';
import { Permission } from '../../db/entity/permission.entity';

// Define a middleware function for permission checking.
const PermissionMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { loggedInRole, action } = res.locals; // Extract the user's role and requested action from the response locals.

	const permissions: Permission[] = loggedInRole.permissions; // Get the user's permissions from their role.
	const loggedInUserPermissions = [];

	// Iterate through the user's permissions and extract their names into an array.
	for (let index = 0; index < permissions.length; index++) {
		const permission = permissions[index];
		loggedInUserPermissions.push(permission.name);
	}

	// Check if the requested action is in the user's permissions.
	if (loggedInUserPermissions.indexOf(action) === -1) {
		sendResponse(res, false, CODE.FORBIDDEN, 'Permission Denied'); // Respond with a "Permission Denied" error.
		return;
	}

	next(); // Continue to the next middleware or route handler.
};;

export default PermissionMiddleware;
