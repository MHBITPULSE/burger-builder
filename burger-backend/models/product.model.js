const { Schema, model } = require('mongoose')

const productSchema = Schema({
      userId: Schema.Types.ObjectId,
      ingredients: [{ type: { type: String }, amount: Number }],
      customer: {
            deliveryAddress: String,
            phone: String,
            paymentType: String
      },
      price: Number,
      orderTime: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports.Product = model("Product", orderSchema)