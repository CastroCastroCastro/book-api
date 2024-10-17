import connectionDB from "../database/connectionDB.js"
import { DataTypes } from 'sequelize';
import userModel from './userModel.js';

//foreign keys in sequelize, connect from user table to books table using foreign keys
//make sure table is made with the foreign key and tables are  connected
const bookModel = connectionDB.define(
    'Book', 
    {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},

{   //define table name?
    timestamps: false,
}
);

userModel.hasMany(bookModel, {foreignKey: 'userId'});
bookModel.belongsTo(userModel, { foreignKey: 'userId' });

export default bookModel;