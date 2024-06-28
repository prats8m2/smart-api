import { Request, Response } from 'express';
import addEvent from './addEvent';
class EventController {
	public add = async (req: Request, res: Response) => {
		addEvent(req, res);
	};


}

export default EventController;
