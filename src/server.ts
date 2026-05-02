import "dotenv/config";
import app from "./app";
import bookingRoutes from "./modules/booking/booking.routes";
import carRoutes from "./modules/car/car.routes";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);