const userRouter = require('../routers/user.routes')
const cartRouter = require('../routers/cart.routes')
const profileRouter = require('../routers/profile.routes')
const orderRouter = require('../routers/order.routes')
const paymentRouter = require('../routers/payment.routes')
module.exports = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/profile', profileRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/payment', paymentRouter)

}