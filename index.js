const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/ANGULAR_BACKEND");

mongoose.connect(
  "mongodb+srv://adarshkumar3088877:rNxHT8BEgh4qwnvS@cluster0.bhnyw6p.mongodb.net/angular_backend?retryWrites=true&w=majority"
);

const post_route = require("./routes/postRoute");
app.use("/api", post_route);

app.listen(8000, function () {
  console.log("Server is running");
});
