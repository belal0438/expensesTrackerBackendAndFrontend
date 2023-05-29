
const Razorpay = require('razorpay');
const Order = require('../models/orders');

exports.purchasepremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;
        await rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            await req.getuserdata.createOrder({ orderid: order.id, status: 'PENDING' })
            return res.status(201).json({ order, key_id: rzp.key_id });
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Somthing went wrong", error: err })
    }

}


exports.updateTransactionStatus = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { payment_id, order_id, status } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } })
        // console.log(order);
        if (status === 'failed') {
            const promise1 = order.update({ paymentid: payment_id, status: 'Failed' })
            const promise2 = req.getuserdata.update({ ispremiumuser: false })
            Promise.all([promise1, promise2]).then(() => {
                return res.status(500).json({ sucess: false, message: 'Transaction failed' })
            })
        }
        else {
            const promise1 = order.update({  paymentid: payment_id, status: 'SUCCESSFUL' })
            const promise2 = req.getuserdata.update({ ispremiumuser: true })
            Promise.all([promise1, promise2]).then(() => {
                return res.status(202).json({ sucess: true, message: 'Transaction Successful' })
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

