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
//Database connection
const url='mongodb://localhost/pizza';

mongoose.connect(url,{ useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
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

//session configuration(sesion library act as middleware therefore we r using app.use)
//session don't work without cookies

app.use(session({
    secret: process.env.COOKIE_SECRET, //WAY TO PROCESS ENV VARIABLE //'ghajsjk' //you can write any string here but it s safe practice to write such variables in environment file for safety
    resave: false,
    store: mongoStore,//to specify where you want to store session or else default is memory
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour (life of cookie:accepts time in milliseconds)
}))

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.json()) //to eanble express json feature to view json data

//Global Middleware
app.use((req,res,next)=>{ //next is callback if everything is fine then we have to call it
res.locals.session= req.session //mounted this session on response
 next() // so that request moves ahead and doesn't get stuck
})
//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)


//so that your layout works keep routes sfter setting engine


app.listen(PORT,()=> {

console.log(`listening on port ${PORT}`)

})