const nodemailer = require("nodemaier");
require("dotenv").config();

const { UKR_NET_EMAIL } = process.env;

// const nonemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: UKR_NET_EMAIL,
//     pass: UKR_NET_PASSWORD,
//   },
// };

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
