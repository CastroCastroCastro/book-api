// esto va dentro de connectionDB.js

import {Sequelize} from 'sequelize';
// import { DB_PASSWORD } from '../config';
import dotenv from 'dotenv';
import {DB_NAME, DB_USER, DB_PASSWORD, PORT, HOST, TEST, NODE_ENV} from '../config.js';

const database = NODE_ENV === 'test' ? TEST : DB_NAME;


//store password in a .env, with this format KEY_DB=XXXX
const connectionDB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
  });

export default connectionDB;