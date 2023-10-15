import { Connection, createConnection } from 'typeorm';
import { DB_CONFIG, DEFAULT_SUPER_ADMIN_CREDS } from '../../config/config';
import Logger from '../utility/logger';
import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { Account } from './entity/account.entity';
import { Permission } from './entity/permission.entity';
import onboardDB from '../helpers/system/onboardDB';
import { CLEAR_DB } from '../constants/queries';

class Database {
	public connect = () => {
		// Initialize a connection pool against the database.
		createConnection({
			type: 'postgres',
			host: DB_CONFIG.host,
			port: parseInt(DB_CONFIG.port, 10),
			database: DB_CONFIG.database,
			username: DB_CONFIG.username,
			password: DB_CONFIG.password,
			entities: [User, Role, Account, Permission],
			subscribers: [],
			logging: DB_CONFIG.logging === 'true',
			synchronize: DB_CONFIG.sync === 'true',
		})
			.then(async (connection: Connection) => {
				//Check if data is empty create super admin
				if (connection.isConnected) Logger.http(`${DB_CONFIG.database} Database Connected!`);
				console.log(`DB URL: ${DB_CONFIG.host}`);
				const user: any[] = await connection.manager.query(
					`Select * from "user"`
				)
				if (DB_CONFIG.clear === 'true') {
					await connection.manager.query(CLEAR_DB);
				}
				if (!user.length) {
					onboardDB(
						DEFAULT_SUPER_ADMIN_CREDS.USER_NAME,
						DEFAULT_SUPER_ADMIN_CREDS.PASSWORD,
						DEFAULT_SUPER_ADMIN_CREDS.EMAIL,
						DEFAULT_SUPER_ADMIN_CREDS.FIRST_NAME,
						DEFAULT_SUPER_ADMIN_CREDS.LAST_NAME
					);
				}
			})
			.catch((error) => console.log(error));
	};
}

export default Database;
