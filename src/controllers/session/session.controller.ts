import { Request, Response } from 'express';
import terminateUserSession from './terminateSession';
import listActiveSessions from './listActiveSession';

class SessionController {
	public list = async (req: Request, res: Response) => {
		listActiveSessions(req, res);
	};

	public terminate = async (req: Request, res: Response) => {
		terminateUserSession(req, res);
	};
}

export default SessionController;
