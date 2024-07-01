import { Request, Response } from 'express';
import addDevice from './addDevice';
import deleteDevice from './deleteDevice';
import getDevice from './getDevice';
import listDevices from './listDevices';
import updateDevice from './updateDevice';
import listAvailableDevices from './listAvailableDevices';
import createDeviceToken from './createDeviceToken';

class DeviceController {
	public add = async (req: Request, res: Response) => {
		addDevice(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateDevice(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getDevice(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listDevices(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteDevice(req, res);
	};

	public listAvailableDevices = async (req: Request, res: Response) => {
		listAvailableDevices(req, res);
	};

	public createDeviceToken = async (req: Request, res: Response) => {
		createDeviceToken(req, res);
	};
}

export default DeviceController;
