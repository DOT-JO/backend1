const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
      },

      name_ar: String,
      price: Number,

      quantity: {
        type: Number,
        default: 1
      },

      size: String,
      color: String
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "paid", "shipped"],
    default: "pending"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
