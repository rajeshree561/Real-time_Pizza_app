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

initAdmin()