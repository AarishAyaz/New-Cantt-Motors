import prisma from "../../config/prisma";

export const getAllUsers = async () =>{
    return prisma.user.findMany({
        select:{
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            isActive: true,
            createdAt: true,
            bookings: true,
        },
        orderBy:{
            createdAt: "desc",
        }
    });
};

export const getUserById = async (id:number) => {
    const user = await prisma.user.findUnique({
        where:{id},
        include:{
            bookings: {
                include:{
                    car: true,
                }
            }
        }
    });

    if(!user){
        throw new Error("User not found");
    }
    return user;
};

export const updateUser = async (id:number, data:any) => {
    const user = await prisma.user.findUnique({
        where:{id},
    });
    if(!user){
        throw new Error("User not found");
    }

    return prisma.user.update({
        where:{id},
        data,
        select:{
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            isActive: true,
            updatedAt: true,
        },
    });
};

export const deleteUser = async (id:number) => {
    const user = await prisma.user.findUnique({
        where: {id},
    });

    if(!user) {
        throw new Error("User not found");
    }
    return prisma.user.delete({
        where: {id},
    });
};