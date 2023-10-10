const express = require('express')
const userRouter = express.Router();

const {viewCartid_generate, addCartid_generate, updateCartid_generate, delCartid_generate} = require('../../controller/cartid_generate');

userRouter.post('/addcartid', addCartid_generate)
userRouter.get('/viewcartid', viewCartid_generate)
userRouter.delete('/delcartid/:cart_id',delCartid_generate)
userRouter.put('/updatecartid', updateCartid_generate)

module.exports = userRouter;