const { error } = require("console");
const fs = require("fs");
const jsonData = "../Data/pack.json";
const MAX_SLOT = process.env.PACKING_LOT_SIZE;
class Car {
  constructor() {
    const data = fs.readFileSync(jsonData);

    const json = JSON.parse(data);
    console.log({ json });
    if (json == {} || json.table == undefined) {
      this.nextSlot = 1;
      this.slotCount = 0;
      return;
    }
    this.obj = json;
    this.nextSlot = new Number(this.obj.table.pop().slotNumber) + 1;
    this.slotCount = this.obj.table.length();
  }

  obj = {
    table: [],
  };

  set newCar(plateNumber) {
    this.carData = { slotNumber: this.nextSlot, plateNumber };
  }

  saveCarToPack() {
    try {
      const data = fs.readFileSync(jsonData);

      const json = JSON.parse(data);
      if (json != {} || json.table !== undefined) {
        this.obj = json;
      }

      this.obj.table.push(this.carData);
      this.slotCount = this.obj.table.length();
      const jsonToFile = JSON.stringify(this.obj);
      fs.writeFileSync(jsonData, jsonToFile);

      return this.carData;
    } catch {
      throw new error();
    }
  }

  removeCarFromPack(slotNumber) {
    const data = fs.readFileSync(jsonData);
    const json = JSON.parse(data);
    if (json != {} || json.table !== undefined) {
      this.obj = json;
    }
    const newObj = this.obj.table.filter(
      (car) => car.slotNumber !== slotNumber
    );
    this.obj.table = newObj;
    this.slotCount = this.obj.table.length();
    const jsonToFile = JSON.stringify(newObj);
    fs.writeFileSync(jsonData, jsonToFile);
  }

  getCarInPack(slotOrPlateNumer) {
    const data = fs.readFileSync(jsonData);
    const json = JSON.parse(data);
    if (json != {} || json.table !== undefined) {
      this.obj = json;
    }
    const findObject = null;

    this.obj.table.Map((car) => {
      if (
        car.slotNumber == slotOrPlateNumer ||
        car.plateNumber == slotOrPlateNumer
      ) {
        findObject = car;
      }
    });
    return findObject;
  }
}

module.exports = Car;
// const c = new Car();
// c.newCar = "12-ff-gg-ff";
// console.log(c.saveCarToPack());
// // c.removeCarFromPack(2);
