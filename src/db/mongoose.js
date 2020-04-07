require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_STRING1, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((e) => {
    console.log("Connection failed");
  });
