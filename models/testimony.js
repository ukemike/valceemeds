const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestimonySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  testify: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}
});

module.exports = mongoose.model("Testimony", TestimonySchema);
