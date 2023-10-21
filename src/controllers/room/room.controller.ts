import { Request, Response } from 'express';
import addSite from './addRoom';
import updateSite from './updateSite';
import getSite from './getRoom';
import listSites from './listSites';
import deleteSite from './deleteSite';
import addRole from '../role/addRole';
import getRoom from './getRoom';
import addRoom from './addRoom';

class RoomController {
	public add = async (req: Request, res: Response) => {
		addRoom(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateSite(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getRoom(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listSites(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteSite(req, res);
	};
}

export default RoomController;
