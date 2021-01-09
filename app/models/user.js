const mongoose=require('mongoose')
const Schema=mongoose.Schema;//constructor function or class


const userSchema=new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique :true}, //unique for unique email addresses
  password:{type:String,required:true},
  role:{type:String, default:'customer'} //for customer /admin role determination

},{timestamps:true}) //timestamp to keep record of when the user added or updated

//const Menu=mongoose.model('Menu')//Menu is singular in database menus will be created

module.exports=mongoose.model('User',userSchema)