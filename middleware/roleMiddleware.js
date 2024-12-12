import { handleHttpError } from "../utils/handleError.js";

export const checkRole = (reqRole) => (req, res, next) => {
    try {
        const user = req.body.user;
        console.log(user);
        const rolesByUser = user.role;
        //compare the arrays and check if the user has the required role
        const checkRoleValue = reqRole.some((roleSingle) => rolesByUser.includes(roleSingle));

        if (!checkRoleValue) {
            handleHttpError(res, "ROLE_NOT_FOUND", 401);
        }

    } catch (error) {
        handleHttpError(res, "ERROR_ROLE", 401);
    }
    next();
}