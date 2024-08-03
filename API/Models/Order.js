const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    houseNumber: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  orderCreationTime: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
