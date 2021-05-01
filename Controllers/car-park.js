const CarPark = require("../Helpers/CarPark");
const car = new CarPark("data/park.json");
//Pack a new car
module.exports.packCar = (req, res) => {
  const plateNumber = req.body.plateNumber;
  if (plateNumber == null)
    return res.status(409).json({ message: "Car Plate Number is required" });

  car.newCar = plateNumber;
  car.saveCarToPark();
  return res.status(200).json({
    message: `You car with plate number '${car.carData.plateNumber}' is packed at slot number '${car.carData.slotNumber}'`,
  });
};

//Remove car from pack
module.exports.unpackCar = (req, res) => {
  const slotNumber = req.params.slotNumber;
  if (slotNumber == null)
    return res.status(409).json({ message: "Please supply Car Slot Number" });

  console.log({ slotNumber });
  const isRemoved = car.removeCarFromPark(slotNumber);
  console.log({ isRemoved });
  if (!isRemoved)
    return res.status(404).json({ message: "Requested car not found" });
  res
    .status(200)
    .json({ message: `Requested car in slot number '${slotNumber}' upacked` });
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
  res
    .status(200)
    .json({
      message: `You car with plate number '${myCar.plateNumber}' found at slot number '${myCar.slotNumber}'`,
    });
};
