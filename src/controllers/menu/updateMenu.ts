import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Product } from '../../db/entity/product.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { Menu } from '../../db/entity/menu.entity';
import { Schedule } from '../../db/entity/schedule.entity';
import CREATE_SCHEDULE from '../../utility/parseSchedule';
import { MenuItem } from '../../db/entity/menu_items.entity';

const updateMenu = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		id,
		name,
		description,
		type,
		scheduleData,
		site,
		menuItemsData,
		status,
	} = req.body;
	const { loggedInId } = res.locals;
	Logger.info(`Update Menu request`);
	const menu: Menu = await Menu.findOne(id);

	//update schedule
	let schedule: Schedule = await Schedule.findOne(menu?.schedule?.id);
	const newSchedule = CREATE_SCHEDULE(schedule, scheduleData);
	await newSchedule.save();

	//update menu
	menu.name = name;
	menu.type = type;
	menu.description = description;
	menu.site = site;
	menu.updatedBy = loggedInId;
	menu.status = status;

	const menuResult = await menu.save();

	//flush all existing menu items
	await MenuItem.delete({ menu: menuResult });

	//create new menu items
	menuItemsData.map(async (menuItem: MenuItem) => {
		let newMenuItem: MenuItem = new MenuItem();
		newMenuItem.menu = menuResult;
		newMenuItem.product = menuItem.product;
		newMenuItem.category = menuItem.category;

		return await MenuItem.save(newMenuItem);
	});

	sendResponse(res, true, CODE.SUCCESS, `Menu updated Successful`, {
		menu: menuResult,
	});
};

export default updateMenu;
