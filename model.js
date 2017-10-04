const mongoose = require('mongoose');
// const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
module.exports = function (mongoURL) {

  mongoose.connect(mongoURL, {
    useMongoClient: true
  });
  const waiterSchema = mongoose.Schema({
    name: String,
    days: []
  })
  waiterSchema.index({name: 1}, {unique: true})
  const waitersModel = mongoose.model("waitersModel", waiterSchema)

  return {
    waitersModel
  }
}
