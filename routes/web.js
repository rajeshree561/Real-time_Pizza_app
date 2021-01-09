//Route file
const authController = require('../app/http/controllers/authController');
const homeController=require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customers/cartController');
const guest =require('../app/http/middlewares/guest')
function initRoutes(app){
 
    app.get('/', homeController().index)
      app.get('/cart',cartController().index)

      app.get('/login',guest,authController().login)//guest is to check if the user is not logged in
      app.post('/login',authController().postLogin) //to send data on login
        app.get('/register',guest,authController().register)//guest is to check if the user is not logged in
         app.post('/update-cart',cartController().update)
 
         app.post('/register',authController().postRegister)
         app.post('/logout',authController().logout)
}
module.exports=initRoutes