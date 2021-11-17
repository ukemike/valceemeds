const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}
});

module.exports = mongoose.model("Faqs", FaqSchema);
