//client side code
//console.log('Hello from app js')
//this file is going automatically on compilation to public folder as we are using Larvel-Mix
//****************************************************************************************************
import axios from 'axios' //importing axios library
import Noty from 'noty'
import moment from 'moment'
import { initAdmin } from './admin'

let addToCart =document.querySelectorAll('.add-to-cart') //array of add to cart button
 let cartCounter=document.querySelector('#cartCounter')

//update cart function
function updateCart(pizza){
    //ajax call
    //using axios library which is mostly used in all production level site(other alternative is to use fetch api of js)
  axios.post('/update-cart', pizza).then(res =>{
 console.log(res)
 cartCounter.innerText= res.data.totalQty //to update new totalqty
 //for notification message
 new Noty({
   type: 'success' ,// for green successsful colour
   timeout:1000,// after how much time it dissapears in millisec
  text: 'Item added to cart',
  progressBar:false
  //layout:'bottomCenter' //to position notifiaction place

}).show();
}).catch(err =>{

  new Noty({
    type: 'error' ,// for green successsful colour
    timeout:1000,// after how much time it dissapears in millisec
   text: 'Something went wrong!!',
   progressBar:false
   //layout:'bottomCenter' //to position notifiaction place
 
 }).show();
})

}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
   //console.log(e)
        //to get the current selected pizza we are going to use data attribute
   //let pizza=btn.dataset.pizza //rightnow it is string//to get data attribute
   let pizza=JSON.parse(btn.dataset.pizza)//to convert it into object agai  parse is used...opposite of stringify
   updateCart(pizza)
   //console.log(pizza)
    })

})
// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}


 //change order status
 let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order) //to convert string back to object
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;// in starting first line is gray by default
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) { //for last stage there won't be next state therefore if condition to check
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);
 //initStripe()

//Socket
// Client side work of socket




let socket = io() // got from server ..code in layout.ejs --script tag

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}
let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    initAdmin(socket) //add check so that it is called only when you are in admin panel
    socket.emit('join', 'adminRoom') //to make adminroom for admin if logged in
}


socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }// to copy object in js use three dots to copy object
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
   updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
    console.log(data)
})