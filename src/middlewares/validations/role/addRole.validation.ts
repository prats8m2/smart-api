import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { Role } from '../../../db/entity/role.entity';

const addRoleValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, permissions } = req.body;
	const { account } = res.locals;

	if (!name || !permissions) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				name,
				permissions,
			}
		);
		return;
	}

	if (!account) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Account is required to add role',
			{ account }
		);
		return;
	}
	const isNameExist = await Role.findOne({ name, account });
	if (isNameExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Role name already exist ', name);
		return;
	}

	res.locals.action = 'ADD-ROLE';

	next();
};

export default addRoleValidation;
