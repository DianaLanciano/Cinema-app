import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';        
import dotenv from 'dotenv';
import helmet from 'helmet';

/******************************************* CONFIGURATION *******************************************/
dotenv.config(); 
const app = express(); 
app.use(express.json()); 
app.use(helmet()); // helps secure Express apps by setting various HTTP headers
app.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin' }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); // allows requests from all origins

/******************************************* ROUTES *******************************************/
app.use("/api/movies", moviesRoutes);








/******************************************* DB SETUP & SERVER CONNECTION *******************************************/
const PORT = process.env.PORT || 5001;
// Server will run if connection to MongoDB is successful
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`MongoDB connection established, server running on port ${PORT}`);
    });
});