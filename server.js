// import the express mudle
import express, { response } from "express";
import mysql2 from "mysql2";
import cors from "cors";

// Create server variable using express

const server = express();
server.use(express.json());
server.use(cors());
const port =4010;
const db = mysql2.createPool({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "Ecommerce",
    connectionLimit: 10
});

server.listen(port, function(){
    console.log("Server");
})



// Get all information
server.get("/products", function(req, res){
    var sqlQuery="CALL `GetAllProducts`()";
    db.query(sqlQuery, function(error, data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data[0]);
        }
    })
});

// Get each product by id
server.get("/products/:id", function(req, res){
    var sqlQuery = "CALL `GetEachProductsByid`(?)";
    var id = req.params.id;

    db.query(sqlQuery,[id], function(error, data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data[0]);
        }
    })
});

// Get product filter by price low to high
server.get("/products", function (req,res){
    var sqlQuery = "CALL `PriceLowtoHigh`()";

    db.query(sqlQuery, function(error, data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data);
        }
    })
});

// Get product filter by price high to low
server.get("/products", function (req,res){
    var sqlQuery = "CALL `PriceHightoLow`()";

    db.query(sqlQuery, function(error, data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data);
        }
    })
});

// Get product filter by lifestyle
server.get("/products:categoryid", function(req, res){
    var sqlQuery = " CALL `GetProductsByLifestyle`(?)";
    var categoryid = req.params.categoryid;

    db.query(sqlQuery,[categoryid], function(error, data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data[0]);
        }
    })
});

// Get product live or offline
server.get("/products:instockid", function(req, res){
    var sqlQuery = " CALL `GetStockInfo`(?)";
    var instockid = req.params.instockid;

    db.query(sqlQuery,[instockid], function(error, data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data[0]);
        }
    })
});

// Add new product
server.post("/products", function(req, res){
    var sqlQuery="CALL `AddNewProduct`(?, ?, ?, ?, ?, ?)";
    var c_image = req.body.c_image;
    var c_title = req.body.c_title;
    var c_description = req.body.c_description;
    var c_price = req.body.c_price;
    var c_instock = req.body.c_instock;
    var c_category_id = req.body.c_category_id

    db.query(sqlQuery,[c_image, c_title, c_description, c_price, c_instock, c_category_id], function(error, data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data[0]);
        }
    })
});

// Update product
server.put("/products/:id", function(req, res){
    var sqlQuery=" CALL `UpdateAllProduct`(?, ?, ?, ?, ?, ?, ?)";
    var id = req.params.id;
    var c_image = req.body.c_image;
    var c_title = req.body.c_title;
    var c_description = req.body.c_description;
    var c_price = req.body.c_price;
    var c_instock = req.body.c_instock;
    var c_category_id = req.body.c_category_id
    

    db.query(sqlQuery,[id, c_image, c_title, c_description, c_price, c_instock, c_category_id], function(error, data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data[0]);
        }
    })
});

//Delete product
server.delete('/products/:id', function(req, res){
    var sqlQuery = " CALL `DeleteProductByid`(?)";
    var c_id = req.params.id;
    db.query(sqlQuery, [c_id], function(error,data){
        if(error){
            res.json(error);
        }
        if(data){
            res.json(data.affectedRows);
        }
    })
})