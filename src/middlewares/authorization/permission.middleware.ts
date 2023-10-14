import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../utility/response';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET_KEY, CODE } from '../../../config/config';
import { Role } from '../../db/entity/role.entity';
import { Permission } from '../../db/entity/permission.entity';

const PermissionMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const { loggedInRole, action } = res.locals;

	const permissions: Permission[] = loggedInRole.permissions;
	const loggedInUserPermissions = [];

	for (let index = 0; index < permissions.length; index++) {
		const permission = permissions[index];
		loggedInUserPermissions.push(permission.name);
	}

	if (
		loggedInUserPermissions.indexOf('ALL') === -1 &&
		loggedInUserPermissions.indexOf(action) === -1
	) {
		sendResponse(res, false, CODE.FORBIDDEN, 'Permission Denied');
	}
	next();
};

export default PermissionMiddleware;
