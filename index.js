const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://kurtis:mypassword@172.22.0.2:27017?authSource=admin")
  .then(() => console.log("successfully connected to mongodb"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("<h2>Hi There</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
