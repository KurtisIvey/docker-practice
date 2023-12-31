const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");

const redis = require("redis");
const RedisStore = require("connect-redis").default;
const redisClient = redis.createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("successfully connected to mongodb"))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

redisClient.connect().catch(console.error);

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    proxy: true,
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000, // in ms
    },
  })
);

// so backend can understand raw json format
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("<h2>Hi There Kurtis Ivey!!!</h2>");
  console.log("yeah it ran");
});
//localhost:3000/posts
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
