import redis from 'redis';
const publisher = redis.createClient();
const subscriber = redis.createClient(); // subscriber is an instance of a Redis client subscribed to Pub/Sub channels.

publisher.on("error", (err) => console.error("Redis publisher error", err));
subscriber.on("error", (err) => console.error("Redis subscriber error", err));

module.exports = { publisher, subscriber };
