const mongoose = require('mongoose');

module.exports = function (mongoURL) {
  mongoose.connect(mongoURL);
  const waiterSchema = mongoose.Schema({
    waiterName: String,
    workDays: Object
  })
  waiterSchema.index({name: 1}, {unique: true})
  const waitersModel = mongoose.model("waitersModel", waiterSchema)

  return {
    waitersModel
  }
}