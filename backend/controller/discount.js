const connection = require("../modal/Dbconnect")

const viewDiscount = async function(req, res){
    let sqlquery = "SELECT * FROM discount";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const addDiscount = async function(req,res){
    // let id = req.body.productid;
    // let name = req.body.productname;
    // let price = req.body.price;
    // let detail = req.body.productdetail;
    let userdata = req.body;
    console.log(userdata);
    let sqlquery = "INSERT INTO discount set ?";
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

const updateDiscount= async function(req, res){
    let data = req.body;
    let id = req.query.subcategory_id;
    let sqlquery = "UPDATE discount SET offer_code=? where subcategory_id = ?";
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

const delDiscount= async function(req, res){
    let id = [req.params.subcategory_id];
     let sqlquery = "DELETE FROM discount WHERE subcategory_id = ?";
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

module.exports={viewDiscount, addDiscount, updateDiscount, delDiscount}