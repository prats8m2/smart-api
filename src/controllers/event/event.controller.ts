import { Request, Response } from 'express';
import addEvent from './addEvent';
import updateEvent from './UpdateEvent';
import getEvent from './getEvent';
import deleteEvent from './deleteEvent';
import listEvents from './listEvents';
class EventController {
	public add = async (req: Request, res: Response) => {
		addEvent(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateEvent(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getEvent(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteEvent(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listEvents(req, res);
	};
}

export default EventController;
