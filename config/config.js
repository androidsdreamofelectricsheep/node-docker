module.exports = {
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
