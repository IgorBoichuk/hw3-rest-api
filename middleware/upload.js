const multer = require("multer");
const path = require("path");

const { HttpError } = require("../helpers");
const Jimp = require("jimp");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${uniquePrefix}_${file.originalname}`;

    cb(null, filename);
  },
});

// const storage = storage2.resize(250, 250, Jimp.RESIZE_BEZIER);

const limits = {
  fileSize: 1024 * 1024,
};

const mimetypeWhiteList = ["image/jpeg", "image/png"];

const fileFilter = (req, file, cb) => {
  if (!mimetypeWhiteList.includes(file.mimetype)) {
    return cb(HttpError(400, "Invalid file format!"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
