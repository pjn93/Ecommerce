const express = require('express')
const userRouter = express.Router();

const {viewUser, viewtotalUsers, addUser, viewuserList ,userstatusUpdate, delUser, userModify, userPasswordUpdate} = require('../../controller/users');

userRouter.post('/adduser', addUser)
userRouter.get('/viewuser', viewUser)
userRouter.get('/viewtotalusers', viewtotalUsers)
userRouter.delete('/deluser/:user_id',delUser)
userRouter.put('/updateuserstatus', userstatusUpdate)
userRouter.put('/modifyuser/:user_id', userModify)
userRouter.patch('/updateuserpassword', userPasswordUpdate)
userRouter.get('/viewuserlist/:user_id', viewuserList)







module.exports = userRouter;