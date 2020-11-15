const crypto = require("crypto");

const calculateSHA256 = (string) =>
  string === null
    ? ""
    : crypto.createHash("sha256").update(string.toString()).digest("hex");

module.exports = calculateSHA256;
