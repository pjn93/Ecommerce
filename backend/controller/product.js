const connection = require("../modal/Dbconnect")

const viewProduct = async function(req, res){
    let id = req.query.retailer_id
    let sqlquery = "SELECT * FROM product where retailer_id = ? ";
    await connection.query(sqlquery, id, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const viewtotalProduct = async function(req, res){
    let sqlquery = "SELECT count(product_id) as total_products FROM product";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const viewshopProducts = async function(req, res){
    let id = req.query.retailer_id;
    let sqlquery = "SELECT * FROM product where retailer_id=?";
    await connection.query(sqlquery, [id], async function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const viewavailableProducts = async function(req, res){
    let id = [req.params.retailer_id];
    let sqlquery = "SELECT item_name FROM product where retailer_id=?";
    await connection.query(sqlquery,[id],function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const postProduct = async (req, res) => {
    try {
    let id = req.query.retailer_id;
    const data = [
    req.body.product_id,
    req.body.retailer_id,
    req.body.price,
    req.body.available_quantity,
    req.body.subcategory_id,
    req.body.item_name,
    req.body.company,
    req.file.location,
    ];
    const sqlQuery =
    "INSERT INTO product values(?, ?, ?, ?, ?, ?, ?, ?)";
    await connection.query(sqlQuery, id, data, (error, result) => {
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

const addProduct = async (req, res) => {
    try {
        const sqlQuery =
        "INSERT INTO product SET?";
    const data = {
    product_id: req.body.product_id,
    retailer_id: req.query.retailer_id,
    price: req.body.price,
    available_quantity: req.body.available_quantity,
    subcategory_id: req.body.subcategory_id,
    item_name: req.body.item_name,
    company: req.body.company,
    image: req.file.location,
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

const updateProduct = async function(req, res){
    let data = req.body;
    let id = [req.query.product_id, req.query.retailer_id];
    let sqlquery = "UPDATE product SET? where product_id = ? and retailer_id = ?";
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


const modifyProduct = async (req, res) => {
    try {
      const dataInfo = {         
    retailer_id: req.body.retailer_id,
    price: req.body.price,
    available_quantity: req.body.available_quantity,
    subcategory_id: req.body.item_name,
    company: req.body.company,
    image: req.file.location,
      }

      const product_id = req.params.product_id;
      const sqlQuery = "UPDATE product SET? where product_id = ?";
      await connection.query(
        sqlQuery,
        [dataInfo, product_id],
        (error, result) => {
          if (error) {
            res.send({ status: 400, Error: error.sqlMessage });
          } else {
            res.send({ status: 200, response: result });
          }
        }
      );
    } catch (error) {
      res.send({ Error: error.sqlMessage });
    }
  };

const updateproductquantity = async function(req, res){
    let data = req.body.available_quantity;
    let id = [req.query.retailer_id, req.query.product_id];
    let sqlquery = "UPDATE product SET available_quantity=? where retailer_id = ? and product_id = ?";
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

const delProduct = async function(req, res){
    let id = [req.params.product_id];
     let sqlquery = "DELETE FROM product WHERE product_id = ?";
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

module.exports={viewProduct, viewshopProducts, addProduct, updateProduct, postProduct ,modifyProduct, delProduct, viewavailableProducts, viewtotalProduct, updateproductquantity}