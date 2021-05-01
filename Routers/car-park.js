const express = require("express");
const router = express.Router();
const { packCar, unpackCar, getPackedCar } = require("../Controllers/car-park");
const { checkLimit } = require("../Middleware/park-limit");
const { checkIPLimit } = require("../Middleware/rate-limit");

router.post("/", [checkIPLimit, checkLimit], packCar);

router.get("/:slotOrPlateNumer", checkIPLimit, getPackedCar);

router.delete("/:slotNumber", checkIPLimit, unpackCar);

module.exports = router;
