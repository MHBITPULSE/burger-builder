const express = require('express');

const app = express();

const cors = require('cors')

app.use(cors());

app.use(express.json());


const userRouter = require('./routers/user.route')

app.use('/user', userRouter)

const orderRouter = require('./routers/order.routes')

app.use('/order', orderRouter)

const paymentRouter = require('./routers/payment.routes')

app.use('/payment', paymentRouter)

const profileRouter = require('./routers/profile.routes')

app.use('/profile', profileRouter)

module.exports = app;

