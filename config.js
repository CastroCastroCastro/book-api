import {config} from 'dotenv';
config();
export const DB_PASSWORD = process.env.db_password;
export const DB_NAME = process.env.db_name;
export const DB_USER = process.env.db_user;
export const DB_PORT = process.env.db_port;
export const HOST = process.env.db_host;
export const TEST = process.env.db_test_name;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;


