const { Store } = require("express-session")
const Order= require('../../../models/order')
const moment =require('moment') //imposting moment so that we cane send it to frontend
function orderController(){
return {
    store(req,res){
       // console.log(req.body)
      // Validate request
    const { phone, address/*stripeToken, paymentType */} = req.body
      if(!phone || !address) {
          req.flash('error','All fields are required')
          return req.redirect('/cart')
          //return res.status(422).json({ message : 'All fields are required' });
      }
      const order = new Order({
        customerId: req.user._id, //pasport makes available logged in user on req 
        items: req.session.cart.items,
        phone,
        address
    })
    order.save().then(result => {
     req.flash('success', 'Order placed successfully')
      delete req.session.cart //to delete cart ater order has been placed
     return res.redirect('/customer/orders')

    }).catch(err=>{
        req.flash('error','Something went wrong')
       return res.redirect('/cart')
    })
       // Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
            
        
    },//end of store method
    //instead of await then catch promise could also be used
    async index(req, res) {
        const orders = await Order.find({ customerId: req.user._id },
         
            null,
            { sort: { 'createdAt': -1 } } )// to sort so that new order comes on top of table
   res.header('Cache-Control', 'no-cache, private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0') //to not show message order placed successfully on clicking back button
          /*   res.render('customers/orders', { orders: orders, moment: moment })
    */
   res.render('customers/orders',{orders:orders,moment: moment}) //sending order and moment to frontend
  // console.log(orders)
    }
}



}
module.exports=orderController