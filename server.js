const express=require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const PORT=process.env.port||7000
//Assets
app.use(express.static('public'))


//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

//so that your layout works keep routes sfter setting engine

app.get('/',function(req,res){
  //res.send('Hello from server')
res.render('home')  
})

app.get('/cart',function(req,res){
//res.send('Hello from server')
res.render('customers/cart')  ;
})
app.get('/login',function(req,res){
  //res.send('Hello from server')
  res.render('auth/login')  ;
  })
  app.get('/register',function(req,res){
    //res.send('Hello from server')
    res.render('auth/register')  ;
    })
    




app.listen(PORT,()=> {

console.log(`listeing on port ${PORT}`)

})