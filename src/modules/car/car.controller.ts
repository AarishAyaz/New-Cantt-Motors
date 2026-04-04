import { Request, Response } from "express";
import { getAllCars, getCarById, createCar } from "./car.service";

export const getCars = async (req: Request, res: Response) => {
    const Cars = await getAllCars();
    res.json({
        success: true,
        data: Cars,
    });
};

export const getCar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const car = await getCarById(id);

    res.json({
        success: true,
        data: car
    });
};

export const createCatController = async (req:Request, res: Response) => {
    const car = await createCar(req.body);

    res.json({
        success: true,
        message: "Car Created Successfully",
        data: car,
    });
};