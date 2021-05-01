const RateLimiter = require("../Helpers/RateLimiter");
const limiter = new RateLimiter("data/rate.json");

module.exports.checkIPLimit = (req, res, next) => {
  const reqIP =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  limiter.newReqIp = reqIP;

  if (!limiter.checkRateLimit())
    return res
      .status(403)
      .json({ message: "Maximum request reached, please try again" });
  next();
};
