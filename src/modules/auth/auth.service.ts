import prisma from "../../config/prisma";
import { RegisterInput } from "./auth.validation";
import {hashPassword} from "../../shared/utils/password";
import {generateToken} from "../../shared/utils/jwt";

import {AppError} from "../../shared/errors/AppError";
import {HTTP_STATUS} from "../../shared/constants/httpStatus";
import {MESSAGES} from "../../shared/constants/messages";

export const registerUser = async (data: RegisterInput) => {
    const existingEmail = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if(existingEmail){
        throw new AppError(
            MESSAGES.EMAIL_ALREADY_EXISTS,
            HTTP_STATUS.CONFLICT
        )
    };
    const existingPhone = await prisma.user.findUnique({
        where:{
            phone: data.phone
        },
    });
    if(existingPhone){
        throw new AppError(
            "Phone already exists",
            HTTP_STATUS.CONFLICT
        )
    };

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
        data:{
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
        },
    });

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    const {password, ...userWithoutPassword} = user;

    return{
        user: userWithoutPassword,
        token,
    }
}