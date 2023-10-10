const express = require('express')
const userRouter = express.Router();

const {viewRoleassign, addRoleassign, viewassignedRole, updateRoleassign, delRoleassign, viewUserRole, revokeAssignedRole} = require('../../controller/role_assign');

userRouter.post('/addroleassign', addRoleassign)
userRouter.delete('/revokeassignrole', revokeAssignedRole)
userRouter.get('/viewroleassign', viewRoleassign)
userRouter.get('/viewuserrole/:user_id', viewUserRole)
userRouter.delete('/delroleassign',delRoleassign)
userRouter.put('/updateroleassign', updateRoleassign)
userRouter.get('/getassignedrole/:user_id', viewassignedRole)


module.exports = userRouter;