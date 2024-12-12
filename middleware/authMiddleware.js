import { handleHttpError } from "../utils/handleError.js";
import { verifyToken } from "../utils/handleJWT.js";
import userModel from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "NEED_SESSION", 401);
            return;
        }
        //find token
        const token = req.headers.authorization.split(' ').pop();
        //verify token
        const dataToken = await verifyToken(token);
        console.log(dataToken);
        //need to check if token is valid
        if(!dataToken || !dataToken.id){
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }
        
        // find user by id
        const user = await userModel.findByPk(dataToken.id);
        if (!user) {
            handleHttpError(res, "USER_NOT_FOUND", 404);
            return;
        }
        // Set user data in the request for access in following steps
        req.body.user = user;
        // Pass to the next middleware/route handler
        next();

    } catch (error) {
        handleHttpError(res, "USER_NOT_FOUND", 401);
    }
}