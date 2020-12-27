const mongoose=require('mongoose')
const Schema=mongoose.Schema;//constructor function or class


const menuSchema=new Schema({
  name:{type:String,required:true},
  image:{type:String,required:true},
  price:{type:Number,required:true},
  size:{type:String,required:true}

})

//const Menu=mongoose.model('Menu')//Menu is singular in database menus will be created

module.exports=mongoose.model('Menu',menuSchema)