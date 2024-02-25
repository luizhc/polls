import Redis from "ioredis";

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;

export const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT ? Number(REDIS_PORT) : 6379,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  tls: {
    rejectUnauthorized: false,
  },
});

redis.connect(() => console.log("Redis connected!"));
