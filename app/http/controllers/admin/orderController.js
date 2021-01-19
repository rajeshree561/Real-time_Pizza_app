const order = require("../../../models/order")

const Order = require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
           order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).//ne=not equal to ,only show not completed orders
           populate('customerId', '-password').exec((err, orders) => { //populate:to get user instead of id as we have related order with user collection in database
               if(req.xhr) { // if ajax call made then send json data
                   return res.json(orders) //json data return
               } else {
                return res.render('admin/orders')
               }
           })
        }
    }
}

module.exports = orderController