const connection = require("../modal/Dbconnect")

/**
 * @swagger
 * components:
 *       schemas: 
 *             user_profile:
 *                type: object
 *                properties:
 *                   user_id:
 *                         type: string
 *                   mobile_no: 
 *                         type: string
 *                   email:
 *                         type: string
 *                   profile_photo: 
 *                         type: string
 *                   adhar:
 *                         type: string
 *                   address: 
 *                         type: string
 *                   state:
 *                         type: string
 *                   city: 
 *                         type: string
 *                   pincode:
 *                         type: string
 */
/**
 * @swagger
 * /api/viewuserprofile:
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
 *                                       $ref : '#components/schemas/user_profile'
 */

/**
 * @swagger
 * /api/adduserprofile:
 *              post:  
 *                  summary: node js api
 *                  description: node js api
 *                  requestBody:
 *                           required: true
 *                           content: 
 *                               application/json:
 *                                   schema:
 *                                       $ref : '#components/schemas/user_profile'
 *                  responses:
 *                      200:
 *                          description: added successfully                       
 */

/**
 * @swagger
 * /api/updateuserprofile/{user_id}:
 *             put:
 *               summary: node js api
 *               description: node js api
 *               parameters: 
 *                   - in: path
 *                     name: user_id
 *                     required: true
 *                     description: string user_id required
 *                     schema:
 *                           type: string
 *               requestBody:
 *                     required: true
 *                     content: 
 *                           application/json:
 *                                  schema: 
 *                                     $ref : '#components/schemas/user_profile'
 *               responses:
 *                     200:
 *                       description: update successfully
 *                       content:
 *                             application/json:
 *                                   schema:
 *                                      type: array
 *                                      items: 
 *                                         $ref : '#components/schemas/user_profile'
 */
/**
 * @swagger
 * /api/updateuserprofilephoto/{user_id}:
 *             put:
 *               summary: node js api
 *               description: node js api
 *               parameters: 
 *                   - in: path
 *                     name: user_id
 *                     required: true
 *                     description: string user_id required
 *                     schema:
 *                           type: string
 *               requestBody:
 *                     required: true
 *                     content: 
 *                           application/json:
 *                                  schema: 
 *                                     $ref : '#components/schemas/user_profile'
 *               responses:
 *                     200:
 *                       description: update successfully
 *                       content:
 *                             application/json:
 *                                   schema:
 *                                      type: array
 *                                      items: 
 *                                         $ref : '#components/schemas/user_profile'
 */

/**
 * @swagger
 * /api/deluserprofile/{user_id}:
 *              delete:  
 *                  summary: this api is used to check if delete method is working or not
 *                  description: this api is used to check if delete method is working or not
 *                  parameters:
 *                      - in: path
 *                        name: user_id
 *                        required: true
 *                        description: string user_id required
 *                        schema:
 *                          type: string
 *                  responses:
 *                      200:
 *                          description: deleted successfully                       
 */



const viewUserprofile = async function(req, res){
    let sqlquery = "SELECT * FROM user_profile";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const viewUserdetail = async function(req, res){
    let id = req.query.user_id;
    let sqlquery = "SELECT * FROM user_profile where user_id=?";
    await connection.query(sqlquery, id ,function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const addUserprofile = async function(req,res){
    let userdata = req.body;
    console.log(userdata);
    let sqlquery = "INSERT INTO user_profile set?";
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

const updateuserprofilephoto = async function(req, res){
    let data = req.body.profile_photo;
    let id = req.query.user_id;
    let sqlquery = "UPDATE user_profile SET profile_photo=? where user_id = ?";
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



const updateUserprofile = async function(req, res){
    let data = req.body;
    let id = req.query.user_id;
    let sqlquery = "UPDATE user_profile SET? where user_id = ?";
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

const delUserprofile = async function(req, res){
    let id = [req.params.user_id];
     let sqlquery = "DELETE FROM user_profile WHERE user_id = ?";
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

module.exports={viewUserprofile, viewUserdetail, addUserprofile, updateuserprofilephoto, updateUserprofile, delUserprofile}