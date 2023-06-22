const isValidId = require("./isValid");
const validateBody = require("./validateBody");
const authenticate = require("./authentication");

const upload = require("./upload");

module.exports = {
  isValidId,
  validateBody,
  authenticate,
  upload,
};
