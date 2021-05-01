const fs = require("fs");
const defaultPath = "../data/park.json";
class CarPark {
  constructor(myPath = null) {
    if (myPath == null) myPath = defaultPath;
    this.readData = fs.readFileSync(myPath);

    this.jsonPath = myPath;
  }

  obj = {
    table: [],
  };

  get nextSlotNumber() {
    const json = JSON.parse(this.readData);
    if (json == {} || json.table == undefined || json.table.length == 0) {
      return 1;
    }
    this.obj = json;
    let val = 0;
    this.obj.table.reduce((acc, mod) => {
      if (acc == undefined) {
        if (val == mod.slotNumber) val += 1;
        return;
      }
      if (acc.slotNumber - mod.slotNumber > 1)
        return (val = acc.slotNumber + 1);
      val = acc.slotNumber + 1;
    }, this.obj.table[0]);
    return val;
  }

  set newCar(plateNumber) {
    this.carData = { slotNumber: this.nextSlotNumber, plateNumber };
  }

  get slotCount() {
    const json = JSON.parse(this.readData);
    if (json == {} || json.table == undefined) {
      return 0;
    }
    this.obj = json;
    return this.obj.table.length;
  }

  saveCarToPark() {
    try {
      const json = JSON.parse(this.readData);
      if (json != {} && json.table !== undefined && json.table.length > 0) {
        this.obj = json;
      }

      this.obj.table.push(this.carData);
      this.obj.table.sort((a, b) => a.slotNumber - b.slotNumber);
      const jsonToFile = JSON.stringify(this.obj);
      fs.writeFileSync(this.jsonPath, jsonToFile);

      return this.carData;
    } catch (error) {
      throw new Error(error);
    }
  }

  removeCarFromPark(slotNumber) {
    const json = JSON.parse(this.readData);
    if (json != {} && json.table !== undefined) {
      this.obj = json;

      const newObj = this.obj.table.filter(
        (car) => car.slotNumber != slotNumber
      );

      if (newObj.length != this.obj.table.length) {
        this.obj.table = newObj;
        const jsonToFile = JSON.stringify(this.obj);
        fs.writeFileSync(this.jsonPath, jsonToFile);
        return true;
      }
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
        return;
      }
    });
    return findObject;
  }
}

module.exports = CarPark;
