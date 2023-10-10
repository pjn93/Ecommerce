const connection = require("../modal/Dbconnect")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const viewCustomer = async function(req, res){
    let sqlquery = "SELECT * FROM customer";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const viewtotalCustomer  = async function(req, res){
    let sqlquery = "SELECT count(*) as totalCustomer from customer";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}


const addCustomer = async function(req,res){
    try {
        const salt = await bcrypt.genSalt(8);
    const value = await bcrypt.hash(req.body.password, salt)
 console.log("password" ,value)
    const sqlQuery ="INSERT INTO customer SET?";

const data = {
email: req.body.email,
mobile_no: req.body.mobile_no,
password: value,
};
await connection.query(sqlQuery, data, (error, result) => {
console.log(result, "result");
console.log(data)
if (error) {
res.send({ status: 400, Error: error.sqlMessage });
} else {
res.send({ status: 200, response: result });
}
});
} catch (error) {
res.send({ Error: error.sqlMessage });
}
}

const customerStatusUpdate = async function(req, res){
    let data = req.query.status;
    let id = req.query.email;
    console.log(data, id)
    let sqlquery = "UPDATE customer SET status=? where email = ?";
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

const updateCustomer= async function(req, res){

    try {
        const salt = await bcrypt.genSalt(8);
        const value = await bcrypt.hash(req.body.password, salt);
        console.log("password", value);
     let data = {
        email: req.body.email,
        password: value,
        status: req.body.status
       };
      let id = [req.params.mobile_no];
      let sqlquery = "UPDATE customer SET? where mobile_no = ?";
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
}

const delCustomer= async function(req, res){
    let id = [req.params.mobile_no];
     let sqlquery = "DELETE FROM customer WHERE mobile_no = ?";
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

module.exports={viewCustomer, customerStatusUpdate, viewtotalCustomer, addCustomer, updateCustomer, delCustomer}