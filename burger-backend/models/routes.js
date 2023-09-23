const userRouter = require('../routes/user.routes')
const productRouter = require('../routes/product.routes')
const cartRouter = require('../routes/cart.routes')
const profileRouter = require('../routes/profile.routes')
const paymentRouter = require('../routes/payment.routes')
module.exports = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/profile', profileRouter)
    app.use('/api/payment', paymentRouter)

}