const Car = require("../Helpers/data-access");
const MAX_SLOT = process.env.PACKING_LOT_SIZE;
module.exports.checkLimit = (req, res, next) => {
  const car = new Car();
  if (car.slotCount === MAX_SLOT)
    res.status(500).json({ message: "Maximum car parking reached" });
  next();
};
