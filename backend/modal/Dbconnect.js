let mysql = require('mysql');

let mysqlcredentials ={user:'root',
                       password:'',
                       host:'localhost',
                        database:'shoppingmania'
                    }
let connection = mysql.createConnection(mysqlcredentials);
connection.connect(function(error){
    if(error){
        console.log(error.sqlMessage)
    }
    else{
        console.log("Database Connected")
    }
})
module.exports=connection;