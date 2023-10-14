import { Request, Response } from 'express';
import addUser from './addUser';

class UserController {
	public add = async (req: Request, res: Response) => {
		addUser(req, res);
	};
}

export default UserController;
