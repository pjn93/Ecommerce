const express = require('express')
const userRouter = express.Router();

const {viewProduct_description, addProduct_description, updateProduct_description, delProduct_description, getproductDescription} = require('../../controller/product_description');

userRouter.post('/addproductdetail', addProduct_description)
userRouter.get('/viewproductdescription', getproductDescription)

userRouter.get('/viewproductdetail', viewProduct_description)
userRouter.delete('/delproductdetail/:p_id',delProduct_description)
userRouter.patch('/updateproductdetail', updateProduct_description)

module.exports = userRouter;