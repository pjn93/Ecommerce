const connection = require("../modal/Dbconnect")

const viewCartid_generate = async function(req, res){
    let sqlquery = "SELECT * FROM cartid_generate";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const addCartid_generate = async function(req,res){
    // let id = req.body.productid;
    // let name = req.body.productname;
    // let price = req.body.price;
    // let detail = req.body.productdetail;
    let userdata = req.body;
    console.log(userdata);
    let sqlquery = "INSERT INTO cartid_generate set ?";
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

const updateCartid_generate= async function(req, res){
    let data = req.body;
    let id = req.query.cart_id;
    let sqlquery = "UPDATE cartid_generate SET status=? where cart_id = ?";
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

const delCartid_generate= async function(req, res){
    let id = [req.params.cart_id];
     let sqlquery = "DELETE FROM cartid_generate WHERE cart_id = ?";
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

module.exports={viewCartid_generate, addCartid_generate, updateCartid_generate, delCartid_generate}