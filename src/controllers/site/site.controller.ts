import { Request, Response } from 'express';
import getUser from './getUser';
import listUsers from './listUsers';
import deleteUser from './deleteUser';
import addSite from './addSite';
import updateSite from './updateSite';

class SiteController {
	public add = async (req: Request, res: Response) => {
		addSite(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateSite(req, res);
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
