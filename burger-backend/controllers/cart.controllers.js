const _ = require('lodash')

const { CartItem, CartItemSchema } = require('../models/cartItem.model')

module.exports.createCartItem = async (req, res) => {
    let { price, product } = _.pick(req.body, ["price", "product"])
    const item = await CartItem.findOne({
        user: req.user._id,
        product: product
    })

    if (item) return res.status(400).send("Item already exists in cart!")

    let cartItem = new CartItem({ price: price, product: product, user: req.user._id })

    const result = await cartItem.save();
    return res.status(201).send({
        message: "Added to cart successfully",
        data: result
    })
}

module.exports.getCartItem = async (req, res) => {
    const cartItem = await CartItem.find({ user: req.user._id })
        .populate('product', 'name')
        .populate('user', 'name')
    if (!cartItem) res.status(400).send("No item found")

    return res.status(200).send(cartItem)
}


module.exports.updateCartItem = async (req, res) => {
    let { _id, count } = _.pick(req.body, ["_id", "count"])

    const userId = req.user._id;


    const item = await CartItem.updateOne({
        _id: _id,
        user: userId,
    }, { count: count })

    return res.status(200).send("Item Updated")
}


module.exports.deleteCartItem = async (req, res) => {
    const _id = req.params.id;
    const userId = req.user._id;
    console.log("id: ", _id)
    const item = await CartItem.deleteOne({
        _id: _id,
        user: userId,
    })

    return res.status(200).send("Item Deleted")
}