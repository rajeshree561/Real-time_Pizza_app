const User= require('../../models/user')
const bcrypt=require('bcrypt')
const passport = require('passport')
function authController(){
    //factory functions
    
    return{
        login(req,res){
            res.render('auth/login')
          },
          postLogin(req,res,next){
            passport.authenticate('local',(err,user,info) =>{ //we r using local strategy here
             if(err){
               req.flash('error',info.message)//to flash message on frontend in case of error
               return next(err)
             }
             if(!user){
              req.flash('error',info.message)
              return res.redirect('/login') //if not user redirect back to login page

             }

             req.logIn(user,(err)=>{ //this user we r getting from done what we have passed in done
               if(err){
                req.flash('error',info.message)//to flash message on frontend in case of error
                return next(err)
               }


               return res.redirect('/')
             })
            })(req,res,next)
          },
        register(req,res){
              res.render('auth/register')
          },
         
        async postRegister(req,res){ // async to make asynchronous function
           const{name,email,password}= req.body
           //Validate request
            if(!name || !email ||!password)
            {
              req.flash('error','All fields are required') // to flash message using flash library ..this msg will be shwon only for one time and then will appear new again
              req.flash('name',name) // so that previous written data don't get erased we are passing this to frontend
              req.flash('email',email)
              return res.redirect('/register') //never forget this part ..if you won't send response then yur req will keep revolving and in end will get cancelled
            }
            //Check if email already exists by searching in database
           User.exists({email:email},(err,result)=>{
           
           if(result){

            req.flash('error','Email already registerd! Please Login!!') // to flash message using flash library ..this msg will be shwon only for one time and then will appear new again
            req.flash('name',name) // so that previous written data don't get erased we are passing this to frontend
            req.flash('email',email)
            return res.redirect('/register') //never forget this part ..
           }
           })

           //Hash password
            const HashedPassword=await bcrypt.hash(password,10) //await has to be used with async function so we have to async keyword to parent function containing this code..ie postRegister

           //create a user
            const user= new User({
              
              //name:name,email:email //when name of variable is same as that of value then only name of variable will also work ex name,email
              name,
              email,
              //password: password //never do this ..password should be hashed
              password: HashedPassword //store hashed password instead of normal password
            })

            user.save().then(()=>{
            //Login....after registeration we want the user to get login
            return res.redirect('/')

            }).catch(err =>{
              req.flash('error','Sorry!!Something went wrong') // to flash message using flash library ..this msg will be shwon only for one time and then will appear new again
              
              return res.redirect('/register')


            })
          },
          logout(req,res){
            req.logout()
            return res.redirect('/login')
          }
          }
    }
    
    module.exports=authController