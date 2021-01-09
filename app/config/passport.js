const LocalStrategy= require('passport-local').Strategy
const User=require('../models/user')
const bcrypt= require ('bcrypt')
function init(passport){
 passport.use(new LocalStrategy({usernameField:'email'},async (email,password,done) => { //to use await its parent function should be asynchronus
     //Login
    //check if email exists
   const user= await User.findOne({email:email})
   if(!user){
       return done(null,false,{message:'No user with this email'})
   }
  
   bcrypt.compare(password,user.password).then( match =>{
       
    if(match){
        return done(null,user,{message:'Logged in successfully'})

    }
    return done(null,false,{message:'Wrong Username or Password'})
   }).catch( err =>{ //in case error during bcrypt
    return done(null,false,{message:'OOps! something went wrong'})
   })

 }))

 passport.serializeUser((user,done)=>{
   done(null,user._id) //passport allows us to store any parameter of logged in user..here we r using id of customer
 })

 passport.deserializeUser((id,done)=>{
    // User.findOne{_} 
    User.findById(id,(err,user)=>{
      done(err, user)
    })
    //due to this deserialise function we can use req.user to get logged in user

    }

 )

}
module.exports=init