const express = require('express')
const userRouter = express.Router();

const {viewPlaceorder, addPlaceorder, updatePlaceorder, delPlaceorder} = require('../../controller/place_order');

userRouter.post('/addplaceorder', addPlaceorder)
userRouter.get('/viewplaceorder', viewPlaceorder)
userRouter.delete('/delplaceorder/:cart_id',delPlaceorder)
userRouter.put('/updateplaceorder', updatePlaceorder)

module.exports = userRouter;