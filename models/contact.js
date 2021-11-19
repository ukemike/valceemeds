const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
