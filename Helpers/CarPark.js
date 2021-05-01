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

  get nextSlot() {
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
        (car) => car.slotNumber !== slotNumber
      );
      this.obj.table = newObj;
      const jsonToFile = JSON.stringify(newObj);
      fs.writeFileSync(this.jsonPath, jsonToFile);
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
// const c = new CarPark();
// c.newCar = "12-ff-gg-ff";
// console.log(c.saveCarToPark());
// c.removeCarFromPark(2);
// console.log(c.getCarInPark(2));
// console.log(c.slotCount);
// console.log(c.id);
