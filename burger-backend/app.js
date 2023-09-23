const express = require('express');

const app = express();

const cors = require('cors')

app.use(cors());

app.use(express.json());


const userRouter = require('./routers/user.routes')

app.use('/user', userRouter)

const orderRouter = require('./routers/order.routes')

app.use('/order', orderRouter)

module.exports = app;

