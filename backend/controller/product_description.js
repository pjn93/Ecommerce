const connection = require("../modal/Dbconnect")

const viewProduct_description = async function(req, res){
    let id = req.query.p_id;
    let sqlquery = "SELECT * FROM product_description where p_id=?";
    await connection.query(sqlquery, id, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const getproductDescription = async function(req, res){
    let id = [req.query.p_id];
    let sqlquery = "SELECT * FROM product_description where p_id=?";
    await connection.query(sqlquery, [id] ,function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const addProduct_description = async function(req,res){
    // let id = req.body.productid;
    // let name = req.body.productname;
    // let price = req.body.price;
    // let detail = req.body.productdetail;
    let userdata = req.body;
    console.log(userdata);
    let sqlquery = "INSERT INTO product_description set ?";
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

const updateProduct_description = async function(req, res){
    let data = req.body;
    let id = req.query.p_id;
    let sqlquery = "UPDATE product_description SET? where p_id = ?";
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


const delProduct_description= async function(req, res){
    let id = [req.params.p_id];
     let sqlquery = "DELETE FROM product_description WHERE p_id = ?";
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

module.exports={viewProduct_description, addProduct_description, updateProduct_description, delProduct_description, getproductDescription}