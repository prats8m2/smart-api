import { Request, Response } from 'express';
import addUser from './addUser';
import updateUser from './updateUser';
import getUser from './getUser';
import listUsers from './listUsers';
import deleteUser from './deleteUser';
import listAccounts from './listAccounts';
import listUsersToAssign from './listUsersToAssign';
import getCountries from './getCountries';
import getStates from './getStates';
import getCurrencies from './getCurrencies';

class UserController {
	public add = async (req: Request, res: Response) => {
		addUser(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateUser(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getUser(req, res);
	};

	public getCountries = async (req: Request, res: Response) => {
		getCountries(req, res);
	};

	public getCurrencies = async (req: Request, res: Response) => {
		getCurrencies(req, res);
	};

	public getStates = async (req: Request, res: Response) => {
		getStates(req, res);
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

	public listUsersToAssign = async (req: Request, res: Response) => {
		listUsersToAssign(req, res);
	};
}

export default UserController;
