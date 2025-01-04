// server/index.js
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import { connectRedis } from "./pubsub/index.js";
import { startSeatCleanup } from './middleware/seatLock.js';
import moviesRoutes from "./routes/movie.routes.js";
import showTimeRoutes from "./routes/showTime.routes.js";
import subscribersRoutes from "./routes/subscriber.routes.js";
import authRoutes from "./routes/auth.routes.js";
/******************************************* CONFIGURATION *******************************************/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // helps secure Express apps by setting various HTTP headers
app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
/******************************************* ROUTES *******************************************/
app.use("/api/movies", moviesRoutes);
app.use("api/showTime", showTimeRoutes);
app.use("/api/subscribers", subscribersRoutes);
app.use("/api/auth", authRoutes);

/******************************************* REDIS PUB/SUB CONNECTION *******************************************/
const setupRedis = async () => {
  try {
    await connectRedis();
  } catch (error) {
    console.error('Redis connection failed - notification system inactive');
    // Server continues running even if Redis fails
  }
};
setupRedis();
/******************************************* SEATS EVENTS *******************************************/
startSeatCleanup();
/******************************************* DB SETUP & SERVER CONNECTION *******************************************/
const PORT = process.env.PORT || 5001;
// Server will run if connection to MongoDB is successful
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(
      `MongoDB connection established, server running on port ${PORT}`
    );
  });
});
