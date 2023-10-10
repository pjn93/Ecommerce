const express = require('express')
const userRouter = express.Router();

const {viewDiscount, addDiscount, updateDiscount, delDiscount} = require('../../controller/discount');

userRouter.post('/adddiscount', addDiscount)
userRouter.get('/viewdiscount', viewDiscount)
userRouter.delete('/deldiscount/:subcategory_id',delDiscount)
userRouter.put('/updatediscount', updateDiscount)

module.exports = userRouter;