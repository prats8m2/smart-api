import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE } from '../../../../config/config';
import { User } from '../../../db/entity/user.entity';
import { Not } from 'typeorm';
import { Site } from '../../../db/entity/site.entity';

const updateSiteValidation = async (
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
		const isNameExist = await Site.findOne({ name, id: Not(id), account });
		if (isNameExist) {
			sendResponse(res, false, CODE.CONFLICT, 'Name already exist ', name);
			return;
		}
	}

	res.locals.action = 'UPDATE-SITE';

	next();
};

export default updateSiteValidation;
