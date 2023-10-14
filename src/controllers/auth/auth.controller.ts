import { Request, Response } from 'express';
import login from './login';

class AuthController {
	public login = async (req: Request, res: Response) => {
		login(req, res);
	};
}

export default AuthController;
