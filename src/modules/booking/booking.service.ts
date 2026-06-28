import prisma from "../../config/prisma";

import { BookingStatus } from "../../generated/prisma/enums";

export const createBooking = async (data: {
  userId: number;
  carId: number;
  date: string;
}) => {
  // Check user exists
  const user = await prisma.user.findUnique({
    where: { id: data.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check car exists
  const car = await prisma.car.findUnique({
    where: { id: data.carId },
  });

  if (!car) {
    throw new Error("Car not found");
  }

  // Prevent booking sold cars
  if (car.status === "SOLD") {
    throw new Error("Car is already sold");
  }

  const bookingDate = new Date(data.date);

  if (bookingDate < new Date()) {
    throw new Error("Cannot book a past date");
  }

  return prisma.booking.create({
    data: {
      userId: data.userId,
      carId: data.carId,
      date: bookingDate,
    },
    include: {
      user: true,
      car: true,
    },
  });
};

export const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      user: true,
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getBookingById = async (id: number) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: true,
      car: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

export const updateBooking = async (
  id: number,
  data: {
    date?: string;
    status?: BookingStatus;
  }
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return prisma.booking.update({
    where: { id },
    data: {
      ...(data.date && {
        date: new Date(data.date),
      }),
      ...(data.status && {
        status: data.status,
      }),
    },
    include: {
      user: true,
      car: true,
    },
  });
};

export const deleteBooking = async (id: number) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return prisma.booking.delete({
    where: { id },
  });
};