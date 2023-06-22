const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { HttpError } = require("../helpers");
const { controllerDecorator } = require("./controller-decorator");
const { SECRET_KEY } = process.env;

const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const avatarDir = path.resolve("public", "avatars");

const signUp = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarDir, filename);

  await fs.rename(oldPath, newPath);
  // const avatarURL = path.join("avatars", filename);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email).resize(250, 250, Jimp.RESIZE_BEZIER);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatar: avatarURL,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Invalid password or email");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Invalid password or email");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      // name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { path: tempUpload, filename } = req.file;
  const img = await Jimp.read(tempUpload);
  await img.resize(250, 250, Jimp.RESIZE_BEZIER);
  await img.writeAsync(tempUpload);
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });

  res.json({
    avatarURL,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "No Content",
  });
};

module.exports = {
  signUp: controllerDecorator(signUp),
  signIn: controllerDecorator(signIn),
  getCurrent: controllerDecorator(getCurrent),
  logout: controllerDecorator(logout),
  updateAvatar: controllerDecorator(updateAvatar),
};
