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