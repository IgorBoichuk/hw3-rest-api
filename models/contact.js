const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: false },
  phone: { type: String, require: true },
  favorite: { type: Boolean, default: false },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
