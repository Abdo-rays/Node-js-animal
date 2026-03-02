import dbconeection from "./DB/dbconnection.js"
import petRouter from './modules/pet/pet.route.js'
import authRouter from './modules/auth/auth.route.js'
import orderRouter from './modules/order/order.route.js'
import shopRouter from './modules/shop/shop.route.js'
import reportRouter from './modules/report/report.route.js'
import reviewRouter from './modules/review/review.route.js'

const bootstrap = (app, express) => {
    app.use(express.json())



    app.use('/api/auth', authRouter);
    app.use('/api/pets', petRouter);
    app.use('/api/shop', shopRouter);
    app.use('/api/orders', orderRouter);
    app.use('/api/reports', reportRouter);
    app.use('/api/reviews', reviewRouter)


    app.use("*", (req, res, next) => {
        return res.status(404).json({ message: "invalid routing" })



    })
    dbconeection()

}

export default bootstrap