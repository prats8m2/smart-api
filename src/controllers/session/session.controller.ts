import { Request, Response } from 'express';
import listSessions from './listSession';
import terminateUserSession from './terminateSession';

class SessionController {
	public list = async (req: Request, res: Response) => {
		listSessions(req, res);
	};

	public terminate = async (req: Request, res: Response) => {
		terminateUserSession(req, res);
	};
}

export default SessionController;
