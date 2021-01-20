const Order = require('../../../models/order')

function statusController() {
    return {
        update(req, res) {
            Order.updateOne({_id: req.body.orderId}, { status: req.body.status }, (err, data)=> { //to send the changed status that admin wants to the admin/order page
                if(err) {
                    return res.redirect('/admin/orders')
                }
                // Emit event 
                const eventEmitter = req.app.get('eventEmitter') //we can get app using req
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status }) 
                return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports = statusController