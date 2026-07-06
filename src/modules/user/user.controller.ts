import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.service";

import { updateUserSchema } from "./user.validation";

export const getUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const user = await getUserById(id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const validatedData = updateUserSchema.parse(req.body);

    const updatedUser = await updateUser(id, validatedData);

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await deleteUser(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};