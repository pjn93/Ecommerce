const express = require('express')
const userRouter = express.Router();

const {viewCart,addCart,updateCart,delCart} = require('../../controller/cart');

userRouter.post('/addcart', addCart)
userRouter.get('/viewcart', viewCart)
userRouter.delete('/delcart/:cart_id',delCart)
userRouter.put('/updatecart', updateCart)

module.exports = userRouter;