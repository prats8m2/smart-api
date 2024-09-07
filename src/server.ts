// Library imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

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
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';
import eventRoutes from './routes/event.routes';
import feedbackRoutes from './routes/feedback.routes';

import Database from './db';

class Server {
	private app: express.Application;
	private httpServer: HttpServer;
	public io: SocketIOServer;

	constructor() {
		this.app = express();
		this.httpServer = createServer(this.app);
		this.io = new SocketIOServer(this.httpServer, {
			cors: {
				origin: 'http://localhost:4200', // Adjust this to your Angular app's URL
				methods: ['GET', 'POST'],
				allowedHeaders: ['my-custom-header'],
				credentials: true, // Optional. You might need this if you're sending cookies or other credentials
			},
		});

		this.config();
		this.routerConfig();
		this.databaseConfig();
		this.socketConfig(); // Added socket configuration
	}

	public getIo(): SocketIOServer {
		return this.io;
	}
	// Configuration
	private config() {
		this.app.use(morgan('dev'));
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
		this.app.use(
			cors({
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
		this.app.use('/api/v1/menu', menuRoutes);
		this.app.use('/api/v1/order', orderRoutes);
		this.app.use('/api/v1/event', eventRoutes);
		this.app.use('/api/v1/feedback', feedbackRoutes);
	}

	// Database
	private databaseConfig() {
		const db = new Database();
		db.connect();
	}

	// Socket configuration
	private socketConfig() {
		this.io.on('connection', (socket) => {
			console.log('New client connected');
			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}

	public start = (port: number) => {
		return new Promise((resolve, reject) => {
			this.httpServer
				.listen(port, () => {
					resolve(port);
				})
				.on('error', (err: object) => reject(err));
		});
	};
}
export default Server;
