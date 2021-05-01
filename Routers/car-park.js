const express = require("express");
const router = express.Router();
const { packCar, unpackCar, getPackedCar } = require("../Controllers/car-park");
const { checkLimit } = require("../Middleware/park-limit");

router.post("/", checkLimit, packCar);

router.get("/:slotOrPlateNumer", getPackedCar);

router.delete("/:slotNumber", unpackCar);

module.exports = router;
