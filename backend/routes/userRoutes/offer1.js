const express = require('express')
const userRouter = express.Router();

const {viewOffer,  offerStatusUpdate, viewofferList, addOffer, updateOffer, delOffer} = require('../../controller/offer');

userRouter.post('/addoffer', addOffer)
userRouter.get('/viewoffer', viewOffer)
userRouter.put('/updateofferstatus', offerStatusUpdate)
userRouter.get('/viewofferlist', viewofferList)
userRouter.delete('/deloffer/:offer_code',delOffer)
userRouter.put('/updateoffer/:offer_code', updateOffer)

module.exports = userRouter;