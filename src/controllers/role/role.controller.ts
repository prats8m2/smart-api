import { Request, Response } from 'express';
import addSite from './addRole';
import listPermissions from './listPermissions';
import updateRole from './updateRole';
import getRole from './getRole';
import listRoles from './listRoles';
import deleteRole from './deleteRole';

class RoleController {
	public add = async (req: Request, res: Response) => {
		addSite(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateRole(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getRole(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listRoles(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteRole(req, res);
	};

	public listPermission = async (req: Request, res: Response) => {
		listPermissions(req, res);
	};
}

export default RoleController;
