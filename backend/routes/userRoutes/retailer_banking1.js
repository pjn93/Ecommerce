const express = require('express')
const userRouter = express.Router();

const {viewRetailer_banking, addRetailer_banking, updateRetailer_banking, delRetailer_banking} = require('../../controller/retailer_banking');

userRouter.post('/addretailerbanking', addRetailer_banking)
userRouter.get('/viewretailerbanking', viewRetailer_banking)
userRouter.delete('/delretailerbanking/:account_no',delRetailer_banking)
userRouter.put('/updateretailerbanking/:retailer_id', updateRetailer_banking)

module.exports = userRouter;