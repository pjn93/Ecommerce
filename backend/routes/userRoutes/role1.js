const express = require('express')
const userRouter = express.Router();

const {addRole, updateRole, getRole, delRole} = require('../../controller/role');

userRouter.post('/addrole', addRole)
userRouter.get('/getrole', getRole)
userRouter.delete('/delrole/:role_id',delRole)
userRouter.put('/updaterole/:role_id', updateRole)

module.exports = userRouter;