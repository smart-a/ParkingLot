const express = require("express");
const router = express.Router();
const { packCar, unpackCar, getPackedCar } = require("../Controllers/car-park");
const { checkLimit } = require("../Middleware/park-limit");

router.post("/", checkLimit, packCar);

router.get("/:slotNumber", getPackedCar);

router.delete("/:slotOrPlateNumer", unpackCar);

module.exports = router;
