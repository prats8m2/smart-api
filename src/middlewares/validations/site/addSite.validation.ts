import { Request, Response, NextFunction } from 'express';
import sendResponse from '../../../utility/response';
import { CODE, SITE_TYPE } from '../../../../config/config';
import { User } from '../../../db/entity/user.entity';
import { Site } from '../../../db/entity/site.entity';
import { Account } from '../../../db/entity/account.entity';

const addSiteValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, type, accountId } = req.body;
	const { account } = res.locals;

	if (!name || !type) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Please enter all mandatory fields',
			{
				name,
				type,
			}
		);
		return;
	}

	if (type !== SITE_TYPE.RESTRAUNT && type !== SITE_TYPE.HOTEL) {
		sendResponse(res, false, CODE.BAD_REQUEST, 'Invalid site type', {
			type,
		});
		return;
	}

	if (!account && !accountId) {
		sendResponse(
			res,
			false,
			CODE.BAD_REQUEST,
			'Account is required to add site',
			{ account, accountId }
		);
		return;
	}
	const accountValue = account ? account : accountId;
	const isNameExist = await Site.findOne({ name, account: accountValue });
	if (isNameExist) {
		sendResponse(res, false, CODE.CONFLICT, 'Site name already exist ', name);
		return;
	}

	res.locals.action = 'ADD-SITE';

	next();
};

export default addSiteValidation;
