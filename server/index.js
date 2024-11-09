import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { subscriber, connectRedis } from "./pubsub/index.js";
import moviesRoutes from "./routes/movie.routes.js";
import showTimeRoutes from "./routes/showTime.routes.js";
import { handleNewMovieUpdate } from "./controllers/pubsub.controller.js";
/******************************************* CONFIGURATION *******************************************/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // helps secure Express apps by setting various HTTP headers
app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // allows requests from all origins

/******************************************* ROUTES *******************************************/
app.use("/api/movies", moviesRoutes);
app.use("api/showTime", showTimeRoutes);

/******************************************* PUB/SUB EVENTS *******************************************/
const setupPubSub = async () => {
  await connectRedis(); // Ensure Redis is connected
  // Subscribe to 'newMovieUpdate' channel
  await subscriber.subscribe("newMovieUpdate", message => {
    handleNewMovieUpdate(message)
  });
};
setupPubSub();
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
