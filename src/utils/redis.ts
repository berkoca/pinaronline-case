import { createClient } from "redis";

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (error) => console.log("Redis client error: ", error));
redisClient.on("ready", () => console.log("Connected to Redis."));

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Redis connection failed: ", err);
  }
})();

export default redisClient;
