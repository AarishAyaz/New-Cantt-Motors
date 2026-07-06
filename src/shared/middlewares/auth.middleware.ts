import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import prisma from "../../config/prisma";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is inactive",
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();

  } catch {

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }

};