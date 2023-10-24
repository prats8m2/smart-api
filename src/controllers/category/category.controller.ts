import { Request, Response } from 'express';
import addCategory from './addCategory';
import deleteCategory from './deleteCategory';
import getCategory from './getCategory';
import listCategories from './listCategories';
import updateCategory from './updateCategory';

class CategoryController {
	public add = async (req: Request, res: Response) => {
		addCategory(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateCategory(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getCategory(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listCategories(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteCategory(req, res);
	};
}

export default CategoryController;
