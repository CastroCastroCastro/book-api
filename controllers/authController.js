//login and register
import bookModel from "../models/bookModel.js";
import bcrypt from 'bcrypt.js';

//Need to test with POSTMAN API CAllS

//need to take in a password, and hash it
export const register = async (req, res) => {
    try {
        const passwordHash = await encrypt(req.body.password);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
        };  
        await userModel.create(newUser);     
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
    
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await UsersModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ error: 'No user found' });
        }
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)
 
        if(!check){
             handleHttpError(res, "PASSWORD_INVALID", 401)
         }
         user.set('password', undefined, {strict:false})

        res.send(user);
            

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }

};