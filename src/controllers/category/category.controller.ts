import { Request, Response } from 'express';
import addSite from './addCategory';
import updateSite from './updateSite';
import getSite from './getSite';
import listSites from './listSites';
import deleteSite from './deleteSite';
import addCategory from './addCategory';

class CategoryController {
	public add = async (req: Request, res: Response) => {
		addCategory(req, res);
	};

	// public update = async (req: Request, res: Response) => {
	// 	updateCategory(req, res);
	// };

	// public get = async (req: Request, res: Response) => {
	// 	getCategory(req, res);
	// };

	// public list = async (req: Request, res: Response) => {
	// 	listCategorys(req, res);
	// };

	// public delete = async (req: Request, res: Response) => {
	// 	deleteCategory(req, res);
	// };
}

export default CategoryController;
