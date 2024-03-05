import { Connection, createConnection } from 'typeorm';
import { DB_CONFIG, DEFAULT_SUPER_ADMIN_CREDS } from '../../config/config';
import Logger from '../utility/logger/logger';
import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { Account } from './entity/account.entity';
import { Permission } from './entity/permission.entity';
import onboardDB from '../helpers/system/onboardDB';
import { CLEAR_DB } from '../constants/queries';
import { Site } from './entity/site.entity';
import { Room } from './entity/room.entity';
import { Device } from './entity/device.entity';
import { Wifi } from './entity/wifi.entity';
import { Category } from './entity/category.entity';
import { Schedule } from './entity/schedule.entity';
import CustomLogger from '../utility/logger/typeORMLogger';
import { Table } from './entity/table.entity';
import { Product } from './entity/product.entity';
import { Product_Category } from './entity/product_category';
import { MenuItem } from './entity/menu_items.entity';
import { Menu } from './entity/menu.entity';
import { Order } from './entity/order.entity';
import { Payment } from './entity/payment.entity';

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
			entities: [
				User,
				Role,
				Account,
				Permission,
				Site,
				Room,
				Device,
				Wifi,
				Category,
				Schedule,
				Table,
				Product,
				Product_Category,
				Menu,
				MenuItem,
				Order,
				Payment,
			],
			subscribers: [],
			logging: DB_CONFIG.logging === 'true',
			synchronize: DB_CONFIG.sync === 'true',
			logger: new CustomLogger(), // Set your custom logger here
		})
			.then(async (connection: Connection) => {
				//Check if data is empty create super admin
				if (connection.isConnected)
					Logger.http(`${DB_CONFIG.database} Database Connected!`);
				Logger.info(`DB URL: ${DB_CONFIG.host}`);
				if (DB_CONFIG.clear === 'true') {
					Logger.error('Clearing Database!');
					await connection.manager.query(CLEAR_DB);
				}
				const user: any[] = await connection.manager.query(
					`Select * from "user"`
				);
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
			.catch((error) => console.error(error));
	};
}

export default Database;
