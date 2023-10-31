import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity';
import { CODE } from '../../../config/config';

const deleteStaff = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete staff request`);

	//create a user
	const user = await User.findOne(id);
	const result = await user.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Staff Delete`, result);
};

export default deleteStaff;
