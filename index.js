const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");

let RedisStore = require("connect-redis")(session);

const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
});

redisClient
  .connect()
  .then(() => console.log("redis connected"))
  .catch((e) => console.error("redis error", e));

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const connectWithRetry = () => {
  mongoose
    .connect(
      `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@pikachu.qhkrd5s.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
      console.error(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 1800000,
    },
  })
);

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("<h2>🏆🏆🏆🏆🏆</h2>");
  console.log("If you are reading this message, that means it works fine.");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
