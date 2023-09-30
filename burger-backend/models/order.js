const { Schema, model } = require('mongoose')

const orderSchema = Schema({
      userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
      },
      transaction_id: {
            type: String,
            unique: true
      },
      ingredients: [{ type: { type: String }, amount: Number }],
      customer: {
            phone: String,
            address1: String,
            address2: String,
            city: String,
            state: String,
            postcode: Number,
            country: String
      },
      status: {
            type: String,
            default: "Cash on delivery",
            enum: ["Cash on delivery", "Paid according to users"]
      },
      price: Number,
      sessionKey: String,
      orderTime: { type: Date, default: Date.now }
})

module.exports.Order = model("Order", orderSchema)