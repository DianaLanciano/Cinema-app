// notification-service/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Redis } from 'ioredis';
import { sendMovieNotification } from './src/services/emailService.js';

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json()); 

// Redis subscriber setup
const subscriber = new Redis(); // Connect to Redis

subscriber.subscribe("newMovieUpdate", (err) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  } else {
    console.log("Notification service subscribed to newMovieUpdate channel");
  }
});

subscriber.on('message', async (channel, message) => {
  if (channel === "newMovieUpdate") {
    try {
      const { movie, subscribers } = JSON.parse(message);
       // Check if we have valid subscribers
       if (!subscribers || subscribers.length === 0) {
        console.log("No subscribers to send notifications to");
        return;
      }
       // Send the movie notification to the provided list of subscribers
       await sendMovieNotification(subscribers, movie);
       console.log("Notification emails sent successfully!");
    } catch (error) {
      console.error('Error processing notification:', error);
    }
  }
});

const PORT = process.env.PORT || 5002;
try {
  app.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting server:", error.message);
}