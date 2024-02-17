import { Request, Response } from 'express';
import addProduct from './addProduct';
import deleteProduct from './deleteProduct';
import getProduct from './getProduct';
import listProducts from './listProducts';
import updateProduct from './updateProduct';
import arrangeProduct from './arrangeProduct';

class ProductController {
	public add = async (req: Request, res: Response) => {
		addProduct(req, res);
	};

	public update = async (req: Request, res: Response) => {
		updateProduct(req, res);
	};

	public get = async (req: Request, res: Response) => {
		getProduct(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listProducts(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteProduct(req, res);
	};

	public arrange = async (req: Request, res: Response) => {
		arrangeProduct(req, res);
	};
}

export default ProductController;
