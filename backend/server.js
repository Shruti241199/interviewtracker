const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const bodyParser = require("body-parser");

const app = express();
const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
app.use("/blogs", blogRouter);
app.use("/user", userRouter);
app.use(bodyParser.json());

//DB Config
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(5001, console.log(`Server started at port 5001`));
  })
  .catch((error) => {
    console.error(error);
  });