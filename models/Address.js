const mongoose = require("mongoose");
const { Schema } = mongoose;
const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
//exports.AddressSchema = AddressSchema;
//for default export use
module.exports = AddressSchema;
// with defualt export we can change the name while importing the variable
