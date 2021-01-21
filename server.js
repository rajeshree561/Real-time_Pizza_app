require('dotenv').config() //module to access variables of env file ..write it at top
const express=require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const PORT=process.env.port||7000
const mongoose=require('mongoose')
const session=require('express-session')
const flash= require('express-flash')
const MongoDbStore=require('connect-mongo')(session) ////session store
const passport = require('passport')
const Emitter = require('events')
//Database connection
const url='mongodb://localhost/pizza';
 
mongoose.connect(process.env.MONGO_CONNECTION_URL,{ useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true }); //url in env file
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});




//session store (MongoDbstore is a class /constructor function)
let mongoStore=new MongoDbStore({
                mongooseConnection: connection,
                collection:'sessions'
                   })

 //Event emitter                  
 const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter) //to bind emitter to app ,now wecan use it anywhere

//session configuration(sesion library act as middleware therefore we r using app.use)
//session don't work without cookies

app.use(session({
    secret: process.env.COOKIE_SECRET, //WAY TO PROCESS ENV VARIABLE //'ghajsjk' //you can write any string here but it s safe practice to write such variables in environment file for safety
    resave: false,
    store: mongoStore,//to specify where you want to store session or else default is memory
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour (life of cookie:accepts time in milliseconds)
}))

//Passport config
const passportInit =  require('./app/config/passport')
passportInit(passport) //passing passport from  here to passsport.js file
app.use(passport.initialize())
app.use(passport.session()) // passport works with session

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.json()) //to eanble express json feature to view json data
app.use(express.urlencoded({extended:false}))// to enable urlencoded for in express..added during post method work in register
//Global Middleware
app.use((req,res,next)=>{ //next is callback if everything is fine then we have to call it
res.locals.session= req.session //mounted this session on response
res.locals.user= req.user // to get the logged in user on
next() // so that request moves ahead and doesn't get stuck
})
//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)
//to show error page when url entered is not found
app.use((req, res) => {
    res.status(404).render('errors/404')
})


//so that your layout works keep routes sfter setting engine


const server= app.listen(PORT,()=> {

console.log(`listening on port ${PORT}`)

})

//Socket


const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
     // console.log(socket.id)
      socket.on('join', (orderId) => { // room should be unique for each orders therefore using order id
      //  console.log(orderId)
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})