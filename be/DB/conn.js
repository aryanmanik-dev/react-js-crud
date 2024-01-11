const mongoose = require("mongoose");
const DB = "mongodb://0.0.0.0:27017/mern-crud";
mongoose
  .connect(DB, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Start"))
  .catch((error) => {
    console.log(error.message);
  });
