const mongoose = require('mongoose');
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
