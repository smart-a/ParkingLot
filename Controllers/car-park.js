const CarPark = require("../Helpers/CarPark");
const car = new CarPark("data/park.json");
//Pack a new car
module.exports.packCar = (req, res) => {
  const platNumber = req.body.platNumber;
  if (platNumber == null)
    return res.status(409).json({ message: "Car Plate Number is required" });

  car.newCar = platNumber;
  car.saveCarToPack();
  return res.status(200).json(car.carData);
};

//Remove car from pack
module.exports.unpackCar = (req, res) => {
  const slotNumber = req.params.slotNumber;
  if (slotNumber == null)
    return res.status(409).json({ message: "Please supply Car Slot Number" });

  const isRemove = car.removeCarFromPark(slotNumber);
  if (!isRemove)
    return res.status(404).json({ message: "Requested car not found" });
  res.status(200).json({ message: "Requested car upacked" });
};

module.exports.getPackedCar = (req, res) => {
  const slotOrPlateNumer = req.params.slotOrPlateNumer;
  if (slotOrPlateNumer == null)
    return res
      .status(409)
      .json({ message: "Please supply Car Plate Number or Slot Number" });

  const myCar = car.getCarInPark(slotOrPlateNumer);
  if (myCar == null)
    return res.status(404).json({ message: "Requested car not found" });
  res.status(200).json(myCar);
};
