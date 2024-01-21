// Library imports
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
// File imports
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import siteRoutes from './routes/site.routes';
import roleRoutes from './routes/role.routes';
import staffRoutes from './routes/staff.routes';
import roomRoutes from './routes/room.routes';
import tableRoutes from './routes/table.routes';
import deviceRoutes from './routes/device.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';

import Database from './db';

class Server {
	private app;

	constructor() {
		this.app = express();
		this.config();
		this.routerConfig();
		this.databaseConfig();
	}

	// Configuration
	private config() {
		this.app.use(morgan('dev'));
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
		this.app.use(
			cors({
				// disable CORS
				origin: '*',
			})
		);
	}

	// Routes
	private routerConfig() {
		this.app.use('/api/v1/user', userRoutes);
		this.app.use('/api/v1/auth', authRoutes);
		this.app.use('/api/v1/site', siteRoutes);
		this.app.use('/api/v1/role', roleRoutes);
		this.app.use('/api/v1/staff', staffRoutes);
		this.app.use('/api/v1/room', roomRoutes);
		this.app.use('/api/v1/device', deviceRoutes);
		this.app.use('/api/v1/category', categoryRoutes);
		this.app.use('/api/v1/table', tableRoutes);
		this.app.use('/api/v1/product', productRoutes);
	}

	//database
	private databaseConfig() {
		const db = new Database();
		db.connect();
	}

	public start = (port: number) => {
		return new Promise((resolve, reject) => {
			this.app
				.listen(port, () => {
					resolve(port);
				})
				.on('error', (err: object) => reject(err));
		});
	};
}

export default Server;
