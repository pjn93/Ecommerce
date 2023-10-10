const connection = require("../modal/Dbconnect")

const viewOffer = async function(req, res){
    let sqlquery = "SELECT * FROM offer";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const viewofferList = async function(req, res){
    let sqlquery = "SELECT offer_code, offer_name FROM offer";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const addOffer = async function(req,res){
    // let id = req.body.productid;
    // let name = req.body.productname;
    // let price = req.body.price;
    // let detail = req.body.productdetail;
    let userdata = req.body;
    console.log(userdata);
    let sqlquery = "INSERT INTO offer set ?";
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

const offerStatusUpdate = async function(req, res){
    let data = req.query.status;
    let id = req.query.offer_code;
    console.log(data, id)
    let sqlquery = "UPDATE offer SET status=? where offer_code = ?";
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


const updateOffer= async function(req, res){
    let data =  req.body
    let id = req.params.offer_code;
    let sqlquery = "UPDATE offer SET? where offer_code = ?";
  await connection.query(sqlquery, [data, id], function(error, result){
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

const delOffer= async function(req, res){
    let id = [req.params.offer_code];
     let sqlquery = "DELETE FROM offer WHERE offer_code = ?";
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

module.exports={viewOffer,  offerStatusUpdate,  addOffer, updateOffer, delOffer, viewofferList}