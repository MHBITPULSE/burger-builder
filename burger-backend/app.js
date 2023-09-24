const express = require('express');

const app = express();

const cors = require('cors')

app.use(cors());

app.use(express.json());

<<<<<<< HEAD
require('./middlewares/routes')(app)
=======

const userRouter = require('./routers/user.route')

app.use('/user', userRouter)

const orderRouter = require('./routers/order.routes')

app.use('/order', orderRouter)
>>>>>>> parent of fb85971 (Start Backend Payment Integration)

module.exports = app;

