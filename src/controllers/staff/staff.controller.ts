import { Request, Response } from 'express';
import updateUser from './updateUser';
import getUser from './getUser';
import listUsers from './listUsers';
import deleteUser from './deleteUser';
import listAccounts from './listAccounts';
import addStaff from './addStaff';

class StaffController {
	public add = async (req: Request, res: Response) => {
		addStaff(req, res);
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

	public listAccounts = async (req: Request, res: Response) => {
		listAccounts(req, res);
	};
}

export default StaffController;
