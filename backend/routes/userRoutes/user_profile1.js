const express = require('express')
const userRouter = express.Router();

const {viewUserprofile, viewUserdetail, updateuserprofilephoto, addUserprofile, updateUserprofile, delUserprofile}= require('../../controller/user_profile');

userRouter.post('/adduserprofile', addUserprofile)
userRouter.get('/viewuserprofile', viewUserprofile)
userRouter.delete('/deluserprofile/:user_id',delUserprofile)
userRouter.put('/updateuserprofile', updateUserprofile)
userRouter.put('/updatuserprofilephoto',updateuserprofilephoto)
userRouter.get('/viewuserdetail', viewUserdetail)


module.exports = userRouter;