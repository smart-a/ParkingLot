const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const carParkRoute = require("./Routers/car-park");

app.use(express.json());

app.use("/car-park", carParkRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
