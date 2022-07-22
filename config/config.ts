import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, `../.env`) });

const { type, host, port, database, username, password, logging } = process.env;

export const SERVER_PORT = 3000;
export const DB_CONFIG = {
  type,
  host,
  port,
  database,
  username,
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

export const VALIDATION = {
  email:
    "^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$",
  mobile: "^(\\+\\d{1,3}[- ]?)?\\d{1}$",
  uuid: "^[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}$",
  password: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
};

export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Client Admin",
  ORG_ACCESS: "Organization access",
  MANAGED_ACCESS: "Managed Report Access",
  OOB_ACCESS: "OOB Report Access",
  SELF_SERVICE_ACCESS: "Self Service Report Access",
  SUPPORT: "Support Access",
};

export const USER_TYPE = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const FOLDERS = {
  ORG: "Public",
  MANAGED: "Managed Reports",
  OOB: "OOB Reports",
  SELF_SERVICE: "Self Service Reports",
  ORG_COMPONENT: "Component_lib",
};

export const ADMIN_ACCOUNT_NAME = "UG";

export const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY ||
  "8D4364AFA2A79D46DDDA74361F9DF1EE939D84DC81E31FC53FAB221CA54E5E31";

export const SESSION_EXPIRE_TIME = 60000;
export const RESET_PASS_EXPIRE_TIME = 5;

export const PORTAL_URL = process.env.PORTAL_URL;
export const RESET_PASS_LINK = `${PORTAL_URL}/#/reset-password`;

export const EMAIL_CONFIG = {
  host:
    process.env.EMAIL_CONFIG_HOST || "email-smtp.eu-central-1.amazonaws.com",
  port: 465,
  secure: process.env.EMAIL_CONFIG_SECURE === "true" ? true : false,
  user: process.env.EMAIL_CONFIG_USER || "AKIA6HNV26O3ZOOSYIPF", // ses user
  pass:
    process.env.EMAIL_CONFIG_PASS ||
    "BG2/oyWcysTnQ//nm65PAoRN7+GVwuPfa+ADaEyXW5Z6", // ses password
};

export const UG_EMAIL = "uan@ultragenicglobal.com";
export const SNOWFLAKE_AUTHENTICATOR = "SNOWFLAKE";

export const MAX_ROW = 10000000;
export const ADMIN_ENTERPRISE_ID = -420420;

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
  INVALID_KEY: 301,
  READ_ONLY: 302,
  NOT_FOUND: 404,
  ALREADY_EXIST: 405,
  UNAUTHORIZED: 501,
  INVALID_CRED: 502,
  JWT_EXPIRE: 503,
  INVALID_TOKEN: 504,
  SERVER_ERROR: 505,
  EMAIL_SERVER_DOWN: 506,
  DENIED: 507,
  REPORTING_SERVER_DOWN: 508,
};

export const LOG_TYPE = {
  SITE: "SITE",
  CLIENT: "CLIENT",
  CONFIG: "CONFIG",
  ADMIN: "ADMIN",
  ROLE: "ROLE",
  USER: "USER",
  SETTINGS: "SETTINGS",
};

export const ACTION_TYPE = {
  ADD: "ADD",
  UPDATE: "EDIT",
  DELETE: "DELETE",
};

export const STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
  DELETED: 2,
};

export const SERVER_TYPE = {
  REPORTING: 1,
  DASHBOARD: 2,
};

export const BANNER_TYPE = {
  INFO: 1,
  ERROR: 2,
  WARNING: 3,
};
