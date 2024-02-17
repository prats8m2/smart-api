import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Menu } from '../../db/entity/menu.entity';
import { MenuItem } from '../../db/entity/menu_items.entity';
import { Schedule } from '../../db/entity/schedule.entity';
import Logger from '../../utility/logger/logger';
import CREATE_SCHEDULE from '../../utility/parseSchedule';
import sendResponse from '../../utility/response';

const addMenu = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, description, type, scheduleData, site, menuItemsData } =
		req.body;
	const { loggedInId } = res.locals;
	Logger.info(`Add menu request`);

	//create schedule
	let newSchedule: Schedule = new Schedule();
	const schedule = CREATE_SCHEDULE(newSchedule, scheduleData);
	const scheduleResult = await schedule.save();

	//create a menu
	let menu: Menu = new Menu();
	menu.name = name;
	menu.type = type;
	menu.description = description;
	menu.site = site;
	menu.schedule = scheduleResult;
	menu.createdBy = loggedInId;

	const menuResult = await menu.save();

	//create menu items
	menuItemsData.map(async (menuItem: MenuItem) => {
		let newMenuItem: MenuItem = new MenuItem();
		newMenuItem.menu = menuResult;
		newMenuItem.product = menuItem.product;
		newMenuItem.category = menuItem.category;

		await MenuItem.save(newMenuItem);
	});

	sendResponse(res, true, CODE.SUCCESS, `Menu added Successful`, menuResult);
};

export default addMenu;
