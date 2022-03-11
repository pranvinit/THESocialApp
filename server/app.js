require("dotenv").config();

const express = require("express");
const app = express();

// middleware imports
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const morgan = require("morgan");
const notFound = require("./middleware/not-found");

// router imorts
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
// const postRouter = require('./routes/postRoutes')

// db imports
const connectDB = require("./db/connect");

// rate limiter config
app.set("trust proxy", 1);
// limits number of requests made by specific ips
app.use(
  rateLimiter({
    windowMs: 1000 * 60,
    max: 60,
  })
);

// setting express middlewares
app.use(express.json());

// setting third-party middlewares
app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
// logs request details
process.env.NODE_ENV === "development" && app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("api is working");
});

// setting routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// setting error middlewares
app.use(notFound);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
