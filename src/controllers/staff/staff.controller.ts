import { Request, Response } from 'express';
import addStaff from './addStaff';
import updateStaff from './updateStaff';
import getSatff from './getStaff';
import listStaff from './listStaff';
import deleteStaff from './deleteStaff';

class StaffController {
	public add = async (req: Request, res: Response) => {
		addStaff(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateStaff(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getSatff(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listStaff(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteStaff(req, res);
	};
}

export default StaffController;
