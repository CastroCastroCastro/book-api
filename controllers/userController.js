import bookModel from "../models/bookModel.js";
import userModel from "../models/userModel.js";
import {request, response} from 'express';
//create methods that asks for role and if role is admin, return all users
//create users, will ask for all fields and specify a role
//routes that only an admin can access

export const getAllUsers = async (req, res) => {
    try{
        const users = await userModel.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error Fetching Users', error);
        res.status(500).send('An error occurred while trying to retrieve the users');
    }
}

export const getUser = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const user = await userModel.findByPk(id);
        return res.json(user);
    } catch (error) {
        console.error('Error Fetching User', error)
        res.status(500).send('An error occurred while trying to retrieve the user');
    }
}

export const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const bodyData = req.body;
        const result = await userModel.update(bodyData, {where : { id: id }});
        if (result){
            const user = await userModel.findByPk(id);
            res.json('User updated correctly');
        } else{
            res.status(404).send('user not found');
        }
    } catch (error) {
        console.error('Error Updating User', error)
        res.status(500).send('An error occurred while trying to update the user');
    }
}

export const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const result = await userModel.destroy({where : { id: id }});
        return res.json(result);
    } catch(error) {
        console.error('Error Deleting User', error)
        res.status(500).send('An error occurred while trying to delete the user');
    }
}