import { Request, Response } from 'express';
import addUser from './addSite';
import updateUser from './updateUser';
import getUser from './getUser';
import listUsers from './listUsers';
import deleteUser from './deleteUser';
import addSite from './addSite';

class SiteController {
	public add = async (req: Request, res: Response) => {
		addSite(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateUser(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getUser(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listUsers(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteUser(req, res);
	};
}

export default SiteController;
