const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKR_NET_EMAIL } = process.env;

const sendEmail = async (data) => {
  await nodemailer.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        from: {
          Email: UKR_NET_EMAIL,
        },
        to: [
          {
            Email: data.to,
          },
        ],
        subject: data.subject,
        html: data.html,
      },
    ],
  });

  return true;
};

module.exports = sendEmail;
