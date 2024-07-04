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
	// Create a Set to track checked categories
	const checkedCategories = new Set();

	//get a menu
	const menus = await Menu.find({
		where: { site: siteId },
		relations: ['schedule'],
	});

	// Extracting product and category IDs from the menuItems
	const currentMenu = menus.find((menu) =>
		checkCurrentSchedule(menu.schedule)
	);

	//select only first menu qualifying criteria
	const menu = currentMenu;

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
	const filteredMenuItems = menuItems.menuItems.filter((item) => {
		const categoryId = item.category.id;

		// If the category has not been checked, check its schedule and add it to the Set
		if (!checkedCategories.has(categoryId)) {
			const isCategoryCurrent = checkCurrentSchedule(item.category.schedule);

			// If the category is current, add it to the Set and return true
			if (isCategoryCurrent) {
				checkedCategories.add(categoryId);
				return true;
			}

			// If the category is not current, add it to the Set and return false
			checkedCategories.add(categoryId);
			return false;
		}

		// If the category has already been checked, assume it was not current
		return false;
	});

	// Group products by category
	const categorizedProducts = filteredMenuItems.reduce(
		(acc: any, item: any) => {
			const categoryName = item.category.name;
			if (!acc[categoryName]) {
				acc[categoryName] = [];
			}
			acc[categoryName].push(item.product);
			return acc;
		},
		{}
	);

	sendResponse(res, true, CODE.SUCCESS, `Menu App Data`, categorizedProducts);
};

export default getAppMenu;
