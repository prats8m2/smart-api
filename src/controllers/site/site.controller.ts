import { Request, Response } from 'express';
import deleteUser from './deleteUser';
import addSite from './addSite';
import updateSite from './updateSite';
import getSite from './getSite';
import listSites from './listSites';

class SiteController {
	public add = async (req: Request, res: Response) => {
		addSite(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateSite(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getSite(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listSites(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteUser(req, res);
	};
}

export default SiteController;
