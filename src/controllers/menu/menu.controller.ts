import { Request, Response } from 'express';
import addMenu from './addMenu';
import deleteMenu from './deleteMenu';
import getMenu from './getMenu';
import listMenus from './listMenus';
import updateMenu from './updateMenu';

class MenuController {
	public add = async (req: Request, res: Response) => {
		addMenu(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateMenu(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getMenu(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listMenus(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteMenu(req, res);
	};
}

export default MenuController;
