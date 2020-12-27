const Menu=require('../../models/menu')
function homeController(){
//factory functions

return{
    async index(req,res){
        //using await method but for await the function in which it is used should be asynchronous

        const pizzas=await Menu.find()
      // console.log(pizzas);
        return res.render('home',{pizzas:pizzas})
        
        }

   
      }
      
    
    }


module.exports=homeController