const { error } = require("console");
const fs = require("fs");
const jsonPath = "../Data/park.json";

class Car {
  constructor() {
    this.readData = fs.readFileSync(jsonPath);
    const json = JSON.parse(this.readData);
    if (json == {} || json.table == undefined || json.table.length == 0) {
      this.nextSlot = 1;
      return;
    }
    this.obj = json;
    this.nextSlot = new Number(this.obj.table.pop().slotNumber) + 1;
  }

  obj = {
    table: [],
  };

  set newCar(plateNumber) {
    this.carData = { slotNumber: this.nextSlot, plateNumber };
  }

  get slotCount() {
    const json = JSON.parse(this.readData);
    if (json == {} || json.table == undefined) {
      return 0;
    }
    return this.obj.table.length + 1;
  }

  saveCarToPark() {
    try {
      const json = JSON.parse(this.readData);
      if (json != {} || json.table !== undefined) {
        this.obj = json;
      }

      this.obj.table.push(this.carData);
      const jsonToFile = JSON.stringify(this.obj);
      fs.writeFileSync(jsonPath, jsonToFile);

      return this.carData;
    } catch {
      throw new error();
    }
  }

  removeCarFromPark(slotNumber) {
    const json = JSON.parse(this.readData);
    if (json != {} && json.table !== undefined) {
      this.obj = json;

      const newObj = this.obj.table.filter(
        (car) => car.slotNumber !== slotNumber
      );
      this.obj.table = newObj;
      const jsonToFile = JSON.stringify(newObj);
      fs.writeFileSync(jsonPath, jsonToFile);
      return true;
    }
    return false;
  }

  getCarInPark(slotOrPlateNumer) {
    const json = JSON.parse(this.readData);
    if (json != {} || json.table !== undefined) {
      this.obj = json;
    }
    let findObject = null;

    this.obj.table.map((car) => {
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
const c = new Car();
// c.newCar = "12-ff-gg-ff";
// console.log(c.saveCarToPark());
// c.removeCarFromPark(2);
// console.log(c.getCarInPark(2));
// console.log(c.slotCount);
