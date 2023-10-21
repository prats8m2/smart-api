import { Request, Response } from 'express';
import addRoom from './addRoom';
import deleteRoom from './deleteRoom';
import getRoom from './getRoom';
import listRooms from './listRooms';
import updateRoom from './updateRoom';

class RoomController {
	public add = async (req: Request, res: Response) => {
		addRoom(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateRoom(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getRoom(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listRooms(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteRoom(req, res);
	};
}

export default RoomController;
