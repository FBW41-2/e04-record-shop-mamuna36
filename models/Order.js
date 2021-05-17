const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  // to be abl to order more than one records convert it to an array
  records: [
    {
      //we want to connect by ID
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record",
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
