import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Menu } from '../../db/entity/menu.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const getMenu = async (req: Request, res: Response) => {
	//fetch data from body
	const { id } = req.params;
	Logger.info(`Get Menu request`);

	//get a menu
	const menu = await Menu.findOne({
		where: { id },
		relations: [
			'site',
			'menuItems',
			'schedule',
			'menuItems.product',
			'menuItems.category',
		],
	});

	// Extracting product and category IDs from the menuItems
	const menuItems = menu.menuItems.map((item) => ({
		product: item.product.id,
		category: item.category.id,
		productName: item.product.name,
		categoryName: item.category.name,
	}));

	// Constructing a new object with required fields
	const menuWithItems = {
		id: menu.id,
		name: menu.name,
		type: menu.type,
		description: menu.description,
		schedule: menu.schedule,
		site: menu.site,
		menuItems: menuItems,
	};

	sendResponse(res, true, CODE.SUCCESS, `Menu Data`, menuWithItems);
};

export default getMenu;
