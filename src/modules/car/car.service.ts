import prisma from "../../config/prisma";

export const getAllCars = async () =>{
    return await prisma.car.findMany();
}

export const getCarById = async (id: number) => {
    return await prisma.car.findUnique({
        where:{id},
    });
};

export const createCar = async (data:{
    title: string;
    price: number;
    year: number;
})=>{
    return await prisma.car.create({
        data,
    });
};

export const updateCar = async (id: number, data:any) =>{
    return await prisma.car.update({
        where: {id},
        data,
    });
};

export const deleteCar = async (id: number) =>{
    return await prisma.car.delete({
        where: {id},
    });
};