import { Request, Response } from 'express';
import addOrder from './addOrder';
import deleteOrder from './deleteOrder';
import getOrder from './getOrder';
import updateOrder from './updateOrder';
import listOrders from './listOrders';
import updateOrderStatus from './updateOrderStatus';
import assignOrder from './assignOrder';
import listAppOrders from './listAppOrders';
import cancelOrder from './cancelOrder';

class OrderController {
	public add = async (req: Request, res: Response) => {
		addOrder(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateOrder(req, res);
	};

	public updateStatus = async (req: Request, res: Response) => {
		updateOrderStatus(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getOrder(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listOrders(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteOrder(req, res);
	};

	public assignOrder = async (req: Request, res: Response) => {
		assignOrder(req, res);
	};

	public cancelOrder = async (req: Request, res: Response) => {
		cancelOrder(req, res);
	};

	public listAppOrders = async (req: Request, res: Response) => {
		listAppOrders(req, res);
	};
}

export default OrderController;
