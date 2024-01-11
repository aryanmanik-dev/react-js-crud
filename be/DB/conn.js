const mongoose = require("mongoose");
// const DB = "mongodb://0.0.0.0:27017/mern-crud";
const DB = "mongodb+srv://aryanmanik98:fLzH7tWqzI4Qzmwb@cluster0.refy7js.mongodb.net/?retryWrites=true&w=majority";
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
