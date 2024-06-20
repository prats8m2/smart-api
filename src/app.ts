import Server from './server';
import { SERVER_PORT } from '../config/config';
import Logger from './utility/logger/logger';

// Create an instance of the server
const serverInstance = new Server();

// Start the server on the specified port
serverInstance
	.start(SERVER_PORT)
	.then(() => {
		Logger.warn('Welcome DEV');
		Logger.info(`Server running on port ${SERVER_PORT}. Happy Developing!`);
	})
	.catch((error) => {
		Logger.error(`Server Down => ${error}`);
	});

export default serverInstance;
