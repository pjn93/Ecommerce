const connection = require("../modal/Dbconnect")


/**
 * @swagger
 * components:
 *       schemas: 
 *             role:
 *                type: object
 *                properties:
 *                   user_id:
 *                         type: string
 *                   role_id:
 *                         type: string
 *                   assignOn: 
 *                         type: date
 */
/**
 * @swagger
 * /api/viewroleassign:
 *           get: 
 *               summary: node js api
 *               description: node js api
 *               responses:
 *                   200:
 *                     description: to test Get method
 *                     content:
 *                         application/json:
 *                                 schema: 
 *                                     type: array
 *                                     items:
 *                                       $ref : '#components/schemas/role_assign'
 */

/**
 * @swagger
 * /api/getassignedrole/{user_id}:
 *              get:  
 *                  summary: node js api
 *                  description: node js api
 *                  parameters: 
 *                   - in: path
 *                     name: user_id
 *                     required: true
 *                     description: string user_id required
 *                     schema:
 *                           type: string
 *                  requestBody:
 *                           required: true
 *                           content: 
 *                               application/json:
 *                                   schema:
 *                                       $ref : '#components/schemas/role_assign'
 *                  responses:
 *                      200:
 *                          description: added successfully                       
 */

/**
 * @swagger
 * /api/addroleassign:
 *              post:  
 *                  summary: node js api
 *                  description: node js api
 *                  requestBody:
 *                           required: true
 *                           content: 
 *                               application/json:
 *                                   schema:
 *                                       $ref : '#components/schemas/role_assign'
 *                  responses:
 *                      200:
 *                          description: added successfully                       
 */
/**
 * @swagger
 * /api/updateroleassign/{role_id}:
 *             put:
 *               summary: node js api
 *               description: node js api
 *               parameters: 
 *                   - in: path
 *                     name: role_id
 *                     required: true
 *                     description: string role_id required
 *                     schema:
 *                           type: string
 *               requestBody:
 *                     required: true
 *                     content: 
 *                           application/json:
 *                                  schema: 
 *                                     $ref : '#components/schemas/roleassign'
 *               responses:
 *                     200:
 *                       description: update successfully
 *                       content:
 *                             application/json:
 *                                   schema:
 *                                      type: array
 *                                      items: 
 *                                         $ref : '#components/schemas/role_assign'
 */


/**
 * @swagger
 * /api/delroleassign/{role_id}:
 *              delete:  
 *                  summary: this api is used to check if delete method is working or not
 *                  description: this api is used to check if delete method is working or not
 *                  parameters:
 *                      - in: path
 *                        name: role_id
 *                        required: true
 *                        description: string role_id required
 *                        schema:
 *                          type: string
 *                  responses:
 *                      200:
 *                          description: deleted successfully                       
 */

const viewRoleassign = async function(req, res){
    let sqlquery = "SELECT * FROM role_assign";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}


const viewassignedRole = async function(req, res){
    let id = [req.params.user_id];
     let sqlquery = "SELECT * FROM role_assign where user_id = ?";
     await connection.query(sqlquery,[id], function(error, result){
         if(error)
         console.log(error.sqlMessage);
         else
          res.send(result);  
          console.log(result);
     })
 }

 const viewUserRole = async function(req, res){
    let id = [req.params.user_id];
     let sqlquery = " select role_id, roleName from role natural join role_assign where user_id=?";
     await connection.query(sqlquery,[id], function(error, result){
         if(error)
         console.log(error.sqlMessage);
         else
          res.send(result);  
          console.log(result);
     })
 }

const addRoleassign = async function(req,res){
    let userdata = req.body;
    console.log(userdata);
    let sqlquery = "INSERT INTO role_assign set ?";
    await connection.query(sqlquery, userdata ,function(error, result){
        if(error){
            console.log(error.sqlMessage);
        }
        else{
            res.send(result);
            console.log(result);
        } 
    })
}

const updateRoleassign = async function(req, res){
    let data = req.body;
    let id = req.query.role_id;
    let sqlquery = "UPDATE role_assign SET user_id=? where role_id = ?";
  await connection.query(sqlquery,[data,id], function(error, result){
        console.log("result", result)
        if(error){
        console.log(error.sqlMessage);
        }
        else{
         res.send(result);  
         console.log("hello")
        }
    })
}

const delRoleassign = async function(req, res){
    let id = [req.params.role_id];
     let sqlquery = "DELETE FROM role_assign WHERE role_id = ?";
     await connection.query(sqlquery,[id], function(error, result){
        console.log("result", result)
        if(error){
        console.log(error.sqlMessage);
        }
        else{
         res.send(result);  
         console.log("hello")
        } 
    })
}

const revokeAssignedRole = async function(req, res){
    let userInfo = [
        req.query.user_id,
        req.query.role_id
    ]
    console.log(userInfo)
    let sqlquery = "DELETE FROM role_assign WHERE user_id = ? AND role_id = ?";
    console.log(sqlquery)
     await connection.query(sqlquery, userInfo , function(error, result){
        console.log("result", result)
        if(error){
        console.log(error.sqlMessage);
        }
        else{
         res.send(result);  
         console.log("hello")
        } 
    })
}

module.exports={viewRoleassign, viewassignedRole, addRoleassign, updateRoleassign, delRoleassign, viewUserRole, revokeAssignedRole}