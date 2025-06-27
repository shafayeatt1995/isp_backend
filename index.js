require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const { socketServer } = require("./socket");
require("./middleware/config/mongo");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/", require("./routes"));

const server = socketServer(app);
server.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
