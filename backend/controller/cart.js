const connection = require("../modal/Dbconnect")


const viewCart= async function(req, res){
    let sqlquery = "SELECT * FROM cart";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const addCart = async function(req,res){
    // let id = req.body.productid;
    // let name = req.body.productname;
    // let price = req.body.price;
    // let detail = req.body.productdetail;
    let userdata = req.body;
    console.log(userdata);
    let sqlquery = "INSERT INTO cart set ?";
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

const updateCart= async function(req, res){
    let data = req.body;
    let id = req.query.cart_id;
    let sqlquery = "UPDATE cart SET quantity=? where cart_id = ?";
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

const delCart= async function(req, res){
    let id = [req.params.cart_id];
     let sqlquery = "DELETE FROM cart WHERE cart_id = ?";
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

module.exports={viewCart, addCart, updateCart, delCart}