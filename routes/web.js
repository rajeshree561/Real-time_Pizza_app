//Route file
const authController = require('../app/http/controllers/authController');
const homeController=require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');
//Middlewares
const guest =require('../app/http/middlewares/guest')
const auth =require('../app/http/middlewares/auth')
const admin =require('../app/http/middlewares/admin')

function initRoutes(app){
 
    app.get('/', homeController().index)
      app.get('/cart',cartController().index)

      app.get('/login',guest,authController().login)//guest is to check if the user is not logged in
      app.post('/login',authController().postLogin) //to send data on login
        app.get('/register',guest,authController().register)//guest is to check if the user is not logged in
         app.post('/update-cart',cartController().update)
 
         app.post('/register',authController().postRegister)
         app.post('/logout',authController().logout)

         
         //Customer routes
         app.post('/order',auth,orderController().store)////we have used auth to protect places only authorised user can access
         app.get('/customer/orders',auth,orderController().index)//for order page successful direction
         app.get('/customer/orders/:id', auth, orderController().show)//:id- to indicate dynamic id which we will show
        // Admin routes
    app.get('/admin/orders', admin, AdminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)
        }
module.exports=initRoutes