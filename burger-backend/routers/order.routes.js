const express = require('express')
const { Order } = require('../models/order')

const authorize = require('../middlewares/authorize')

const router = express.Router()

const newOrder = async (req, res) => {
      const order = new Order(req.body);
      try {
            await order.save();
            return res.status(201).send("Order Placed Successfully");
      } catch (err) {
            return res.status(400).send('Somethimg went wrong!')
      }
}

const orderList = async (req, res) => {
      const orders = await Order.find({ userId: req.user._id }).sort({ orderTime: -1 })
      res.send(orders)
}


router.post('/', authorize, newOrder)

router.get('/', authorize, orderList)

module.exports = router
