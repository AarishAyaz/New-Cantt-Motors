import {Request, Response} from 'express';

import {registerSchema, loginSchema} from "./auth.validation";
import {registerUser, loginUser} from "./auth.service";
import {sendResponse} from "../../shared/utils/response";
import {HTTP_STATUS} from "../../shared/constants/httpStatus";
import {MESSAGES} from "../../shared/constants/messages";

export const registerController = async (
    req: Request,
    res: Response
) => {
    try{
        const validatedData = registerSchema.parse(req.body);

        const result = await registerUser(validatedData);

        return sendResponse(
            res,
            HTTP_STATUS.CREATED,
            true,
            MESSAGES.REGISTER_SUCCESS,
            result
        );
    } catch (error: any) {
        return sendResponse(
            res,
            error.statusCode || HTTP_STATUS.BAD_REQUEST,
            false,
            error.message
        )
    }
}

export const loginController = async (
    req: Request,
    res: Response
) => {
    try{
        const validatedData = loginSchema.parse(req.body);
        const result = await loginUser(validatedData);

        return sendResponse(
            res,
            200,
            true,
            MESSAGES.LOGIN_SUCCESS,
            result
        );
    } catch(error: any) {
        return sendResponse(
            res,
            error.statusCode || HTTP_STATUS.BAD_REQUEST,
            false,
            error.message
        );
    }
}