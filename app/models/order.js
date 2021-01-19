const mongoose=require('mongoose')
const Schema=mongoose.Schema;//constructor function or class


const orderSchema=new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,//basically we are making relation between our order collection with user collection by linking
        ref: 'User',// linking with which collection :user
        required: true// is this required :yes ,as order should be placed for a particular user
        },
items: { type: Object, required: true },//ordered items,we are going to use items key in session because it contains all ordered items
phone: { type: String, required: true},
address: { type: String, required: true},
paymentType: { type: String, default: 'COD'},
//paymentStatus: { type: Boolean, default: false },
status: { type: String, default: 'order_placed'},
},{timestamps:true}) //timestamp to keep record of when the user added or updated



module.exports=mongoose.model('Order',orderSchema)