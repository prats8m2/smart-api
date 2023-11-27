import { Request, Response } from 'express';
import addTable from './addTable';
import deleteTable from './deleteTable';
import getTable from './getTable';
import listTables from './listTables';
import updateTable from './updateTable';

class TableController {
	public add = async (req: Request, res: Response) => {
		addTable(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateTable(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getTable(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listTables(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteTable(req, res);
	};
}

export default TableController;
