const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Igor:Gross37038263@cluster0.ohos347.mongodb.net/my-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
