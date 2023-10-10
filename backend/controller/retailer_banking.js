const connection = require("../modal/Dbconnect")

const viewRetailer_banking = async function(req, res){
    let id = req.query.retailer_id;
    let sqlquery = "SELECT * FROM retailer_banking where retailer_id=?";
    await connection.query(sqlquery, id, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}


const addRetailer_banking = async function(req,res){
        try {
            const sqlQuery =
            "INSERT INTO retailer_banking SET?";
        const data = {
        retailer_id: req.query.retailer_id,
        bank_name: req.body.bank_name,
        account_no: req.body.account_no,
        ifsc_code: req.body.ifsc_code,
        accountholder_name: req.body.accountholder_name,
        branch: req.body.branch,
        status: req.body.status,
        };
      
        await connection.query(sqlQuery, data, (error, result) => {
        console.log(result, "result");
        if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
        } else {
        res.send({ status: 200, response: result });
        }
        });
        } catch (error) {
        res.send({ Error: error.sqlMessage });
        }
        };
    

const updateRetailer_banking = async function(req, res){
    let data = req.body;
    let id = [req.params.retailer_id];
    let sqlquery = "UPDATE retailer_banking SET? where retailer_id = ?";
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

const delRetailer_banking = async function(req, res){
    let id = [req.params.account_no];
     let sqlquery = "DELETE FROM retailer_banking WHERE account_no = ?";
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

module.exports={viewRetailer_banking, addRetailer_banking, updateRetailer_banking, delRetailer_banking}