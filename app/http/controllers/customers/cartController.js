//const { json} =require('express')

function cartController(){
    //factory functions
    
    return{
              index(req,res){
              res.render('customers/cart')
               },
             update(req,res){
                 //***structure of our cart
                 // let cart = {
            //     items: {
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }
            ///****/
            //if cart is not there (ie. first time )create cart with following structure
               if(!req.session.cart){
                req.session.cart={
                    items: {},
                            totalQty: 0,
                            totalPrice: 0
                            }
                }

                let cart=req.session.cart
                //console.log(req.body)
                
                 //Check if item does not exist in cart
             if(!cart.items[req.body._id]){//in order to select some prperty from request body
                cart.items[req.body._id]={
                    item:req.body,
                    qty:1
                }   
                cart.totalQty = cart.totalQty + 1,
                cart.totalPrice= cart.totalPrice + req.body.price

              }
              else{
                  cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                  cart.totalQty=cart.totalQty +1
                  cart.totalPrice=cart.totalPrice + req.body.price
              }
                 
                return res.json({ totalQty: req.session.cart.totalQty})
             }

          }
    }
    
    module.exports=cartController