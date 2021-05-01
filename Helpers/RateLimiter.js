const fs = require("fs");
const defaultPath = "../data/rate.json";
const MAX_REQ = new Number(process.env.MAX_REQ);
const RATE_LIMIT_TIME = new Number(process.env.RATE_LIMIT_TIME);

class RateLimiter {
  constructor(myPath = null) {
    if (myPath == null) myPath = defaultPath;
    this.readData = fs.readFileSync(myPath);
    this.jsonPath = myPath;
  }

  ipObj = {
    table: [],
  };

  set newReqIp(ipAddress) {
    this.reqIP = {
      IP: ipAddress,
      firstReqTime: new Date().getTime(),
    };
  }

  get reqCount() {
    const json = JSON.parse(this.readData);
    if (json != {} && json.table != undefined && json.table.length > 0) {
      this.ipObj = json;
      const ipIndex = this.ipObj.table.findIndex(
        (ip) => ip.IP == this.reqIP.IP
      );
      if (ipIndex != null) {
        return this.ipObj.table[ipIndex].reqCount;
      }
    }
    return 0;
  }

  checkRateLimit() {
    try {
      let allowReq = false;
      const json = JSON.parse(this.readData);
      if (json != {} && json.table !== undefined && json.table.length > 0) {
        this.ipObj = json;
        const ipIndex = this.ipObj.table.findIndex(
          (ip) => ip.IP == this.reqIP.IP
        );
        if (ipIndex != null) {
          const userIP = this.ipObj.table[ipIndex];
          const reqTime =
            (new Date().getTime() - new Number(userIP.firstReqTime)) / 1000;

          //To much request in less than 10s
          //Deny request
          if (reqTime < RATE_LIMIT_TIME && userIP.reqCount == MAX_REQ) {
            allowReq = false;
          }

          //To much request in less than 10s
          //Deny request and remove IP record if 10s is reached
          else if (reqTime >= RATE_LIMIT_TIME && userIP.reqCount == MAX_REQ) {
            const newObj = this.ipObj.table.filter((ip, index) => {
              console.log({ ip, index, ipIndex });
              index != ipIndex;
            });
            this.ipObj.table = newObj;
            allowReq = false;
          }

          //Reset count after 10s
          //Allow new request
          else if (reqTime >= RATE_LIMIT_TIME && userIP.reqCount < MAX_REQ) {
            userIP.reqCount = 1;
            userIP.firstReqTime = new Date().getTime();
            this.ipObj.table[ipIndex] = userIP;
            allowReq = true;
          }

          //Update request count when count is less than 10 and request is within 10s
          else if (reqTime < RATE_LIMIT_TIME && userIP.reqCount < MAX_REQ) {
            userIP.reqCount += 1;
            this.ipObj.table[ipIndex] = userIP;
            allowReq = true;
          }
          //Stringify json object and save to file
          const jsonToFile = JSON.stringify(this.ipObj);
          fs.writeFileSync(this.jsonPath, jsonToFile);
          return allowReq;
        }
      }
      //New Request IP
      const newIPEntry = { ...this.reqIP, reqCount: 1 };
      this.ipObj.table.push(newIPEntry);
      allowReq = true;

      //Stringify json object and save to file
      const jsonToFile = JSON.stringify(this.ipObj);
      fs.writeFileSync(this.jsonPath, jsonToFile);

      return allowReq;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = RateLimiter;
