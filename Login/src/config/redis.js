import redis from "redis";

const redisClient = await redis.createClient({
  // url: "redis://default:java1994@redis-13935.c14.us-east-1-2.ec2.cloud.redislabs.com:13935/0",
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB_NUM}`,
  legacyMode: true, // 반드시 설정 !!
});

await redisClient.on("connect", () => {
  console.info("Redis connected!");
});

await redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

await redisClient.connect();

export default redisClient.v4;
