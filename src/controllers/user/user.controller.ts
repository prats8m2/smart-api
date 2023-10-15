import { Request, Response } from 'express';
import addUser from './addUser';
import updateUser from './updateUser';
import getUser from './getUser'

class UserController {
	public add = async (req: Request, res: Response) => {
		addUser(req, res)
	}

	public update = async (req: Request, res: Response) => {
		updateUser(req, res)
	}

	public get = async (req: Request, res: Response) => {
		getUser(req, res)
	}
}

export default UserController;
