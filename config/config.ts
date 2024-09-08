import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, `../.env`) });

const { type, host, port, database, dbuser, password, logging } = process.env;

export const SERVER_PORT = 3000;
export const DB_CONFIG = {
	type,
	host,
	port,
	database,
	dbuser,
	password,
	logging,
	sync: process.env.DB_SYNC,
	clear: process.env.DB_CLEAR,
};

export const DEFAULT_SUPER_ADMIN_CREDS = {
	FIRST_NAME: process.env.SUPER_ADMIN_FIRST_NAME,
	LAST_NAME: process.env.SUPER_ADMIN_LAST_NAME,
	USER_NAME: process.env.SUPER_ADMIN_USER_NAME,
	EMAIL: process.env.SUPER_ADMIN_EMAIL,
	PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
};

export const WEB_URL = 'http://localhost:4201';
export const QR_URL = `${WEB_URL}/app`;

export const VALIDATION = {
	email:
		"^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$",
	mobile: '^(\\+\\d{1,3}[- ]?)?\\d{1}$',
	password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
};

export const ROLES = {
	SUPER_ADMIN: 'Super-Admin',
	OWNER: 'OWNER',
	MANAGER: 'MANAGER',
	ATTENDANT: 'ATTENDANT',
};

export const SITE_TYPE = {
	HOTEL: 1,
	RESTAURANT: 2,
};

export const JWT_SECRET_KEY =
	process.env.JWT_SECRET_KEY ||
	'8D4364AFA2A79D46DDDA74361F9DF1EE939D84DC81E31FC53FAB221CA54E5E31';

export const SESSION_EXPIRE_TIME = 60000;
export const RESET_PASS_EXPIRE_TIME = 5;

export const EMAIL_CONFIG = {
	host:
		process.env.EMAIL_CONFIG_HOST || 'email-smtp.eu-central-1.amazonaws.com',
	port: 465,
	secure: process.env.EMAIL_CONFIG_SECURE === 'true' ? true : false,
	user: process.env.EMAIL_CONFIG_USER || 'AKIA6HNV26O3ZOOSYIPF', // ses user
	pass:
		process.env.EMAIL_CONFIG_PASS ||
		'BG2/oyWcysTnQ//nm65PAoRN7+GVwuPfa+ADaEyXW5Z6', // ses password
};

export const MAX_ROW = 10000000;

export const MAX_LENGTH = {
	SITE_NAME: 50,
	IP: 15,
	USERNAME: 50,
	PASSWORD: 50,
	CLIENT_NAME: 50,
	CLIENT_ID: 10,
	EMAIL: 300,
	FIRST_NAME: 50,
	LAST_NAME: 50,
	ADDRESS: 300,
	ZIP_CODE: 10,
	COUNTRY: 50,
	CONTACT_NAME: 100,
	MEDRA_HOST: 500,
	MEDRA_USER_NAME: 300,
	MEDRA_PASS: 300,
	MEDRA_DB_NAME: 300,
	ROLE_NAME: 50,
	BANNER_TITLE: 50,
	BANNER_MSG: 250,
};

export const CODE = {
	SUCCESS: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	SERVER_ERROR: 500,
};

export const STATUS = {
	ACTIVE: 1,
	INACTIVE: 0,
};

export const TYPE = {
	FOOD: 1,
	AMENITIES: 2,
};

export const ORDER_CATEGORY = {
	FOOD: 1,
	AMENITIES: 2,
};

export const ORDER_TYPE = {
	TABLE: 1,
	ROOM: 2,
	ONLINE: 3,
	OFFLINE: 4,
	SOS: 5,
	ROOM_SERVICE: 6,
	ROOM_CLEANING: 7,
};

export const ORDER_STATUS = {
	CREATED: 1,
	PROGRESS: 2,
	DELIVERED: 3,
	CANCELED: 4,
};

export const PAYMENT_TYPE: any = {
	ONLINE: 1,
	OFFLINE: 2,
};

export const EVENT_TYPE: any = {
	IN_HOUSE: 1,
	OUTSIDE: 2,
};

export const SESSION_STATUS = {
	IN_ACTIVE: 0,
	ACTIVE: 1,
};
