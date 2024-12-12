//login and register
import bookModel from "../models/bookModel.js";
import bcrypt from 'bcryptjs';
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import { handleHttpError } from "../utils/handleError.js";
import { encrypt, compare } from "../utils/handlePassword.js";
import { tokenSign } from "../utils/handleJWT.js";
dotenv.config();
import { matchedData } from 'express-validator';

export const registerController = async (req, res) => {
  try {
    // const data = matchedData(req);  // Validate and sanitize input
    const passwordHashed = await encrypt(req.body.password);  // Hash the password
    const existingUserByEmail = await userModel.findOne({ where: { email: req.body.email } });

    if (existingUserByEmail) {
      return res.status(409).json({ message: "The email is already registered" });
    }

    const newUser = { ...req.body, password: passwordHashed};  // Create user object with hashed password

    const user = await userModel.create(newUser);
    user.set('password', undefined, { strict: false });  // Avoid exposing the password

    const sessionData = {
      token: await tokenSign(user),  // Sign JWT token for user session
      user
    };

    res.status(201).json({ sessionData });  // Send token and user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error:error});
  }
};

export const loginController = async (req, res) => {
  try {
    const data = req.body  // Validate and sanitize input
  
    const user = await userModel.findOne({ where: { email: data.email } });  

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const checkPassword = await compare(data.password, user.password);  // Compare hashed password

    if (!checkPassword) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    user.set('password', undefined, { strict: false });  // Avoid exposing the password

    const sessionData = {
      token: await tokenSign(user),  // Sign JWT token
      user
    };

    res.send({ sessionData });  // Send token and user data
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

