import { Request, Response } from "express";
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from "./car.service";
import {createCarSchema, updateCarSchema} from "./car.validation";



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
    if(!car){
        return res.status(404).json({
            success: false,
            message:"Car not found"
        })
    }else{
            res.status(200).json({
        success: true,
        data: car
    });
    }

};

export const createCarController = async (req:Request, res: Response) => {
    try {
        const validatedData = createCarSchema.parse(req.body);

        const car = await createCar(validatedData);

        res.status(201).json({
            success: true,
            data: car,
        });
    } catch (error: any) {
        res.status(400).json({
            success:false,
            message: error.errors || "Validation failed"
        })
    }
};

export const updateCarController = async (req: Request, res: Response) => {
 try {
       const id = Number(req.params.id);
       const validatedData = updateCarSchema.parse(req.body);
       const updated = await updateCar(id, validatedData);
   
       res.status(200).json({success: true, data: updated});
 } catch (error: any) {
    res.status(400).json({success: false, message: error.message || "Update failed!"})
 }
};

export const deleteCarController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await deleteCar(id);

    res.status(200).json({success: true, message:"Car deleted"})
}