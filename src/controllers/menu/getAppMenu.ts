import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Menu } from '../../db/entity/menu.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';
import { checkCurrentSchedule } from '../../helpers/menu/checkCurrentSchedule';

const getAppMenu = async (req: Request, res: Response) => {
	//fetch data from body
	const { siteId } = res.locals;
	Logger.info(`Get App Menu request`);

	//get a menu
	const menus = await Menu.find({
		where: { site: siteId },
		relations: ['schedule'],
	});

	// Extracting product and category IDs from the menuItems
	const currentMenu = menus.filter((menu) =>
		checkCurrentSchedule(menu.schedule)
	);

	//select only first menu qualifying criteria
	const menu = currentMenu[0];

	// fetch menuItems of menu
	const menuItems = await Menu.findOne(menu.id, {
		relations: [
			'menuItems',
			'menuItems.category',
			'menuItems.category.schedule',
			'menuItems.product',
		],
	});

	// Filter menuItems based on category schedule
	const filteredMenuItems = menuItems.menuItems.filter((item) =>
		checkCurrentSchedule(item.category.schedule)
	);

	// Group products by category
	const categorizedProducts = filteredMenuItems.reduce((acc: any, item: any) => {
		const categoryName = item.category.name;
		if (!acc[categoryName]) {
			acc[categoryName] = [];
		}
		acc[categoryName].push(item.product);
		return acc;
	}, {});



	sendResponse(res, true, CODE.SUCCESS, `Menu App Data`, categorizedProducts);
};

export default getAppMenu;
