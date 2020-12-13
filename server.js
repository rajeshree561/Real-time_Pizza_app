const express=require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const PORT=process.env.port||7000
app.get('/',function(req,res){
    //res.send('Hello from server')
  res.render('home')  
})
//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')
app.listen(PORT,()=> {

console.log(`listeing on port ${PORT}`)

})