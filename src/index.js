require("dotenv").config();
const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/donors", require("./routers/donor"));
app.use("/deserveds", require("./routers/deserved"));
app.use("/carriers", require("./routers/carrier"));
app.use("/reporters", require("./routers/reporter"));

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
