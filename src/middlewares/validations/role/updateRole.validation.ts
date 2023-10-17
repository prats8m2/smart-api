import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { Not } from 'typeorm';
import { Role } from '../../../db/entity/role.entity';

const updateRoleValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id, name } = req.body;
	const { account } = res.locals;

	if (!id) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{ id }
		);
		return;
	}

	if (name) {
		const isNameExist = await Role.findOne({ name, id: Not(id), account });
		if (isNameExist) {
			sendResponse(res, false, CODE.CONFLICT, 'Name already exist ', name);
			return;
		}
	}

	res.locals.action = 'UPDATE-ROLE';

	next();
};

export default updateRoleValidation;
