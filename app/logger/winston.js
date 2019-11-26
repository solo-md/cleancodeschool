const winston = require("winston")

module.exports = winston.createLogger({
  level: (typeof jasmine === "undefined" ? "info" : "debug"),
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
})
