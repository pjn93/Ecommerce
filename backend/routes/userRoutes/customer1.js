const express = require('express')
const userRouter = express.Router();

const {viewCustomer, customerStatusUpdate, viewtotalCustomer, addCustomer, updateCustomer, delCustomer} = require('../../controller/customer');

userRouter.post('/addcustomer', addCustomer)
userRouter.get('/viewtotalcustomer', viewtotalCustomer)
userRouter.get('/viewCustomer', viewCustomer)
userRouter.put('/updatecustomerstatus', customerStatusUpdate)
userRouter.delete('/delCustomer/:mobile_no',delCustomer)
userRouter.put('/updatecustomer/:mobile_no', updateCustomer)

module.exports = userRouter;