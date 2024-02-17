import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Menu } from '../../db/entity/menu.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const deleteMenu = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Delete menu request`);

	//delete a menu
	const menu = await Menu.findOne(id);
	const result = await menu.softRemove();
	sendResponse(res, true, CODE.SUCCESS, `Menu Delete`, result);
};

export default deleteMenu;
