const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      match: validRegex,
      unique: [true, "User with such email already exists"],
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    subscription: {
      type: String,
      enum: {
        values: ["starter", "pro", "business"],
        message: `Subscriptions options: "starter", "pro", "business"`,
      },
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    contacts: [],
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
