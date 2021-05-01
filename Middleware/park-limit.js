const CarPark = require("../Helpers/CarPark");
const MAX_SLOT = process.env.PACKING_LOT_SIZE;

module.exports.checkLimit = (req, res, next) => {
  const car = new CarPark("data/park.json");
  const slotCount = new Number(car.slotCount);
  const maxSlot = new Number(MAX_SLOT);
  if (slotCount >= maxSlot)
    return res.status(403).json({ message: "Maximum car parking reached" });
  next();
};
