const mongoose = require("mongoose");
const mongoDBURI = process.env.mongoDBURI;
mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
