import prisma from "../../config/prisma";

export const createBooking = async (data: {
    name: string;
    phone: string;
    date: string;
    carId: number;
})=> {
    const car = await prisma.car.findUnique({
        where: {id: data.carId},
    });

    if(!car){
        throw new Error("Car not found");
    }

    if(car.status === "SOLD"){
        throw new Error("Car is already sold");
    }

    const bookingDate = new Date(data.date);

    if(bookingDate < new Date()){
        throw new Error("Cannot book past date")
    }
    return await prisma.booking.create({
        data: {
            name: data.name,
            phone: data.phone,
            date:  bookingDate,
            carId: data.carId,
        }
    })
}


export const getAllBookings = async () => {
    return prisma.booking.findMany({
        include:{
            car: true,
        },
        orderBy: {
            createdAt: "desc",

        }
    })
}

export const getBookingById = async (id: number) =>{
    const booking = await prisma.booking.findUnique({
        where: {id},
        include:{
            car: true
        }
    });
    if(!booking) throw new Error("Booking not found!");
    return booking;    
}

export const updateBooking = async (id: number, data: any) =>{
    const booking = await prisma.booking.findUnique({
        where: {id},
        data: {
            ...data,
            ...(data.date && {date: new Date(data.date)}),
        },
    });
};

export const deleteBooking = async (id: number) =>{
    const booking = await prisma.booking.findUnique({
        where: {id},
    })
    if(!booking) throw new Error("Booking not found!");

    return prisma.booking.delete({
        where: {id},
    });
};