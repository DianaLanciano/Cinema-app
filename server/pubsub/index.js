import { createClient } from "redis";

// Create Redis clients
const publisher = createClient();
const subscriber = createClient();

// Connect to Redis
const connectRedis = async () => {
  try {
    await subscriber.connect();
    subscriber.on('connect', () => console.log("Subscriber connected"));

    console.log("Connected to Redis");
  } catch (error) {
    console.error("Redis connection error:", error);
  }
};

// Set up error handling
publisher.on("error", (err) => console.error("Redis publisher error:", err));
subscriber.on("error", (err) => console.error("Redis subscriber error:", err));

export { publisher, subscriber, connectRedis };
