const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const apicache = require("apicache");
const connectDB = require("./config/db.js");
const { DB_NAME } = require("./constants.js");
const { userRoute } = require("./routes/user-routes.js");
const adminRoute = require("./routes/admin-routes.js");
const affiliateRoute = require("./routes/affiliate-routes.js");
const path = require("path");
const fs = require("fs");
const { ApiResponse } = require("./utils/ApiResponse.js");
connectDB(DB_NAME);
const app = express();

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  statusCode: 429,
  handler: (_, res) => {
    res.status(429).json(new ApiResponse(429, "Too many requests"));
  },
});

app.use(limiter);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ttg.digitalcret.in"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(limiter);
app.set("trust proxy", 1);

let cache = apicache.middleware;

// Routes
// app.use("/api/v1/user", cache("2 minutes"), userRoute);
// app.use("/api/v1/affiliate", cache("2 minutes"), affiliateRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/affiliate", affiliateRoute);

// Default Response for checking if server is running in development
if (process.env.NODE_ENV !== "production") {
  const html = `
<body bgColor='black' style='color:white;font-size:5rem;display:flex;justify-content:center; align-items:center;' >Api is Running...</body>
`;
  app.get("/", (_, res) => {
    res.send(html);
  });
}
if (process.env.NODE_ENV === "production") {
  // Logger
  app.use((req, res, next) => {
    const { method, url, ip } = req;
    fs.appendFile(
      "./logs/ServerLogs.txt",
      `${Date.now()} ${method} ${url} ${ip} \n`,
      "utf8",
      (err) => {
        if (err) throw err;
      }
    );
    next();
  });

  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
  app.get("*.css", (req, res, next) => {
    res.contentType("text/css");
    next();
  });
}
const PORT = process.env.PORT || 8080;

// Starting Server
app.listen(PORT, () => {
  console.log(
    `Server Started on Port: ${PORT} \n Server URL: http://localhost:${PORT}`
  );
});
