import connectionDB from "../database/connectionDB.js"
import { DataTypes } from 'sequelize';

const userModel = connectionDB.define(
    
    'User',
    //id is created automatically?
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, //no se puede repetir
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },

    {   
        // tableName: 'users', define table name?
        timestamps: false,
    }
);

export default userModel;