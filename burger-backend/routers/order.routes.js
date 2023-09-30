const _ = require('lodash')
const express = require('express')
const { Order } = require('../models/order')

const { Profile } = require('../models/profile')

const authorize = require('../middlewares/authorize')

const router = express.Router()

const newOrder = async (req, res) => {
      const order = new Order(_.pick(req.body, ['userId', 'ingredients', 'customer', 'price', 'status']));
      order.transaction_id = (new Date()).getTime();
      try {
            const result = await order.save();
            return res.status(201).send(result);
      } catch (err) {
            console.log(err)
            return res.status(400).send('Somethimg went wrong!')
      }
}

const orderList = async (req, res) => {
      const orders = await Order.find({ userId: req.user._id }).sort({ orderTime: -1 })
      res.send(orders)
}

const getOrderById = async (req, res) => {
      console.log(req.params.id)
      const order = await Order.findById(req.params.id)
      if (order) res.status(200).send(order)
      else res.status(400).send("No order Found")
}


router.post('/', authorize, newOrder)

router.get('/', authorize, orderList)

router.get('/:id', authorize, getOrderById)

module.exports = router
