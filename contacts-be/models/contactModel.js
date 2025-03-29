const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  { 
    user_id :{
      type: mongoose.Schema.Types.ObjectId, // to access mongodb id
      required:true,
      ref : "User"
    },
    name: {
      type: String,
      required: [true, "please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "please add the contact email"],
    },
    phone: {
      type: String,
      required: [true, "please add the phone no"],
    },
  },
  {
    timestamps: true,
  }
);
//Contact -> denotes schema name
module.exports = mongoose.model("Contact", contactSchema);
