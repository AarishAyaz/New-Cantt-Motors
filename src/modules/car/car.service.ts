import { tr } from "zod/v4/locales";
import prisma from "../../config/prisma";

export const getAllCars = async () =>{
    return await prisma.car.findMany({
        include:{
            images: true
        },
        orderBy:{
            createdAt:"desc"
        }
    });
}

export const getCarById = async (id: number) => {
    return await prisma.car.findUnique({
        where:{id},
        include:{
            images: true,
            bookings: true,
        }
    });
};

export const createCar = async (data:{
    title: string;
    price: number;
    year: number;
    brand: string;
    model: string;
    mileage: number;
    fuelType: "PETROL" | "DIESEL" | "ELECTRIC" | "HYBRID";
    transmission: "MANUAL" | "AUTOMATIC";
    registrationCity: string;
    registrationNumber: string;
    description?: string;
})=>{try {
        return await prisma.car.create({
        data,
    });
} catch (error) {
    throw new Error("Failed to create car:");
}

};

export const updateCar = async (id: number, data:any) =>{
    const car = await prisma.car.findUnique({where:{id}});

    if(!car){
        throw new Error("Car not found");
    }
    return await prisma.car.update({
        where: {id},
        data,
    })
};

export const deleteCar = async (id: number) =>{
    const car = await prisma.car.findUnique({where:{id}});
    if(!car){
        throw new Error("Car not found");
    }
    return await prisma.car.delete({
        where:{id},
    })
};