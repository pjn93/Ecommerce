const connection = require("../modal/Dbconnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;

/**
 * @swagger
 * components:
 *       schemas:
 *             users:
 *                type: object
 *                properties:
 *                   user_id:
 *                         type: string
 *                   name:
 *                         type: string
 *                   password:
 *                         type: string
 *                   status:
 *                         type: integer
 *                   createdOn:
 *                         type: date
 */
/**
 * @swagger
 * /api/viewuser:
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
 *                                       $ref : '#components/schemas/users'
 */
/**
 * @swagger
 * /api/viewuserlist/{user_id}:
 *           get:
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
 *                                     $ref : '#components/schemas/users'
 *               responses:
 *                   200:
 *                     description: to test Get method
 *                     content:
 *                         application/json:
 *                                 schema:
 *                                     type: array
 *                                     items:
 *                                       $ref : '#components/schemas/users'
 */
/**
 * @swagger
 * /api/adduser:
 *              post:
 *                  summary: node js api
 *                  description: node js api
 *                  requestBody:
 *                           required: true
 *                           content:
 *                               application/json:
 *                                   schema:
 *                                       $ref : '#components/schemas/users'
 *                  responses:
 *                      200:
 *                          description: added successfully
 */

/**
 * @swagger
 * /api/updateuserstatus/{user_id}:
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
 *                                     $ref : '#components/schemas/users'
 *               responses:
 *                     200:
 *                       description: update successfully
 *                       content:
 *                             application/json:
 *                                   schema:
 *                                      type: array
 *                                      items:
 *                                         $ref : '#components/schemas/users'
 */
/**
 * @swagger
 * /api/modifyuser/{user_id}:
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
 *                                     $ref : '#components/schemas/users'
 *               responses:
 *                     200:
 *                       description: update successfully
 *                       content:
 *                             application/json:
 *                                   schema:
 *                                      type: array
 *                                      items:
 *                                         $ref : '#components/schemas/users'
 */
/**
 * @swagger
 * /api/updateuserpassword/{user_id}:
 *             patch:
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
 *                                     $ref : '#components/schemas/users'
 *               responses:
 *                     200:
 *                       description: update successfully
 *                       content:
 *                             application/json:
 *                                   schema:
 *                                      type: array
 *                                      items:
 *                                         $ref : '#components/schemas/users'
 */
/**
 * @swagger
 * /api/deluser/{user_id}:
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

const viewUser = async function (req, res) {
  let sqlquery = "SELECT * FROM users";
  await connection.query(sqlquery, function (error, result) {
    if (error) console.log(error.sqlMessage);
    else res.send(result);
    console.log(result);
  });
};

const viewuserList = async function (req, res) {
  let id = [req.params.user_id];
  let sqlquery =
    "SELECT * FROM users where user_id=`${req.query.id}` && name like`%${req.query.name}";
  await connection.query(sqlquery, [id], function (error, result) {
    if (error) console.log(error.sqlMessage);
    else res.send(result);
    console.log(result);
  });
};

const viewtotalUsers = async function (req, res) {
  let sqlquery = "SELECT count(*) as totalUsers from users";
  await connection.query(sqlquery, function (error, result) {
    if (error) console.log(error.sqlMessage);
    else res.send(result);
    console.log(result);
  });
};

const addUser = async function (req, res) {
  try {
       const salt = await bcrypt.genSalt(8);
       const value = await bcrypt.hash(req.body.password, salt);
       console.log("password", value);
       const sqlQuery = "INSERT INTO users SET?";

       const data = {
         user_id: uuid(),
         name: req.body.name,
         password: value,
         };
       await connection.query(sqlQuery, data, (error, result) => {
         console.log(result, "result");
         console.log(data);
         if (error) 
         {
            res.send({ status: 400, Error: error.sqlMessage });
         } 
         else {
         res.send({ status: 200, response: result });
         }
        });
    }
     catch (error) {
      res.send({ Error: error.sqlMessage });
      }
};

const userstatusUpdate = async function (req, res) {
  let data = req.query.status;
  let id = req.query.user_id;
  console.log(data, id);
  let sqlquery = "UPDATE users SET status=? where user_id = ?";
  await connection.query(sqlquery, [data, id], function (error, result) {
    console.log("result", result);
    if (error) {
      console.log(error.sqlMessage);
    } else {
      res.send(result);
      console.log("hello");
    }
  });
};

const userModify = async function (req, res) {
    try {
        const salt = await bcrypt.genSalt(8);
        const value = await bcrypt.hash(req.body.password, salt);
        console.log("password", value);
     let data = {
        name: req.body.name,
        password: value,
       };
      let id = [req.params.user_id];
      let sqlquery = "UPDATE users SET? where user_id = ?";
  await connection.query(sqlquery, [data, id], function (error, result) {
    console.log("result", result);
    if (error) {
      console.log(error.sqlMessage);
    } else {
      res.send(result);
      console.log("hello");
    }
  });
}
  catch (error){
     res.send({ Error: error.sqlMessage})
  }

};

const userPasswordUpdate = async function (req, res) {
  let data = req.body.password;
  let id = req.query.user_id;
  let sqlquery = "UPDATE users SET password=? where user_id = ?";
  await connection.query(sqlquery, [data, id], function (error, result) {
    console.log("result", result);
    if (error) {
      console.log(error.sqlMessage);
    } else {
      res.send(result);
      console.log("hello");
    }
  });
};

const delUser = async function (req, res) {
  let id = [req.params.user_id];
  let sqlquery = "DELETE FROM users WHERE user_id = ?";
  await connection.query(sqlquery, [id], function (error, result) {
    console.log("result", result);
    if (error) {
      console.log(error.sqlMessage);
    } else {
      res.send(result);
      console.log("hello");
    }
  });
};

module.exports = {
  viewUser,
  viewtotalUsers,
  addUser,
  viewuserList,
  userPasswordUpdate,
  userstatusUpdate,
  delUser,
  userModify,
};
