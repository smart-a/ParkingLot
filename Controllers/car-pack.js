module.exports.Pack = (req, res) => {
  const platNumber = req.body.platNumber;
  if (platNumber == null)
    return res.status(409).json({ message: "Car Plate Number is required" });
};
