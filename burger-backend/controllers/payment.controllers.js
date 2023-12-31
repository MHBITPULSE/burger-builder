const PaymentSession = require('ssl-commerz-node').PaymentSession

//const { CartItem, CartItemSchema } = require('../models/cartItem.model')
const { Order } = require('../models/order')
const { Payment } = require('../models/payment')

//const { Profile } = require('../models/profile.model')

const path = require('path')

module.exports.ipn = async (req, res) => {
      const payment = new Payment(req.body);
      const tran_id = payment['tran_id']
      if (payment['status'] === 'VALID') {
            const order = await Order.updateOne({ transaction_id: tran_id }, { status: "Complete" })
            await CartItem.deleteMany(order.cartItems)
      } else {
            await Order.deleteOne({ transaction_id: tran_id })
      }
      await payment.save();
      return res.status(200).send("IPN")
}

module.exports.initPayment = async (req, res) => {
      console.log(req.query)

      const userId = req.user._id;
      console.log(userId)
      //const cartItems = await CartItem.find({ user: userId })

      const order = await Order.findOne({ _id: req.query.id })

      //console.log(profile)

      const { phone,
            address1,
            address2,
            city,
            state,
            postcode,
            country } = order.customer

      const total_amount = order.price

      const total_item = 1

      const tran_id = order.transaction_id;


      const payment = new PaymentSession(true, process.env.STORE_ID, process.env.STORE_PASSWORD)

      // Set the urls
      payment.setUrls({
            success: "https://bohubrihi-server.toirihoi.com/api/payment/success", // If payment Succeed
            fail: "yoursite.com/fail", // If payment failed
            cancel: "yoursite.com/cancel", // If user cancel payment
            ipn: "https://bohubrihi-server.toirihoi.com/api/payment/ipn", // SSLCommerz will send http post request in this link
      });

      // Set order details
      payment.setOrderInfo({
            total_amount: total_amount, // Number field
            currency: "BDT", // Must be three character string
            tran_id: tran_id, // Unique Transaction id
            emi_option: 0, // 1 or 0
      });

      // Set customer info
      payment.setCusInfo({
            name: req.user.name,
            email: req.user.email,
            add1: address1,
            add2: address2,
            city: city,
            state: state,
            postcode: postcode,
            country: country,
            phone: phone,
            fax: phone,
      });

      // Set shipping info
      payment.setShippingInfo({
            method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
            num_item: total_item,
            name: req.user.name,
            add1: address1,
            add2: address2,
            city: city,
            state: state,
            postcode: postcode,
            country: country,
      });

      // Set Product Profile
      payment.setProductInfo({
            product_name: "Bohubrihi E-com Products",
            product_category: "General",
            product_profile: "general",
      });

      await payment.paymentInit()
            .then(async (response) => {
                  if (response.status === 'SUCCESS') {
                        order.sessionKey = response['sessionkey']
                        await order.save()
                  }
                  return res.status(200).send(response);
            })
            .catch(err => console.log(err));
}

module.exports.paymentSuccess = async (req, res) => {
      res.sendFile(path.join(__basedir + "/public/success.html"))
}