import { Request, Response } from 'express';
import addUser from './addUser';
import updateUser from './updateUser';

class UserController {
	public add = async (req: Request, res: Response) => {
		addUser(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateUser(req, res);
	};
}

export default UserController;
