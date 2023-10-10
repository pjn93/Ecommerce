const connection = require("../modal/Dbconnect")

/**
 * @swagger
 * components:
 *       schemas: 
 *             role:
 *                type: object
 *                properties:
 *                   role_id:
 *                         type: string
 *                   roleName: 
 *                         type: string
 */
/**
 * @swagger
 * /api/viewrole:
 *           post: 
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
 *                                       $ref : '#components/schemas/role'
 */

/**
 * @swagger
 * /api/addrole:
 *              post:  
 *                  summary: node js api
 *                  description: node js api
 *                  requestBody:
 *                           required: true
 *                           content: 
 *                               application/json:
 *                                   schema:
 *                                       $ref : '#components/schemas/role'
 *                  responses:
 *                      200:
 *                          description: added successfully                       
 */

/**
 * @swagger
 * /api/updaterole/{role_id}:
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
 *                                     $ref : '#components/schemas/role'
 *               responses:
 *                     200:
 *                       description: update successfully
 *                       content:
 *                             application/json:
 *                                   schema:
 *                                      type: array
 *                                      items: 
 *                                         $ref : '#components/schemas/role'
 */


/**
 * @swagger
 * /api/delrole/{role_id}:
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

const getRole = async function(req, res){
    let sqlquery = "SELECT * FROM role";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}




const addRole = async function(req,res){
    // let id = req.body.productid;
    // let name = req.body.productname;
    // let price = req.body.price;
    // let detail = req.body.productdetail;
    let userdata = req.body;
    console.log(userdata);
    let sqlquery = "INSERT INTO role set ?";
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

const updateRole = async function(req, res){
    let data = req.body;
    let id = [req.params.role_id];
    let sqlquery = "UPDATE role SET? where role_id = ?";
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

const delRole = async function(req, res){
    let id = [req.params.role_id];
     let sqlquery = "DELETE FROM role WHERE role_id = ?";
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

module.exports={getRole, addRole, updateRole, delRole}