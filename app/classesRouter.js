const express = require("express");
const {Client}=require('pg');

const QUERY_CONST = require("./constants/dbQuery");
const RESPONSE_CONST=require("./constants/response");

//DB connection
const client =new Client("postgres://ehhcmqsb:xcBCgsMlrcyqlUsU0mPL6aljm3B2UBxV@isilo.db.elephantsql.com:5432/ehhcmqsb");

client.connect()
.then(() => console.log("Connected to db successfully"))
.catch(e => console.log(e)) 


//API calls
const router = express.Router();

router.get("/", (req, res) => {
    client.query(QUERY_CONST.GET_CLASSES)
    .then(result => {return res.send(result.rows)})
    .catch(e =>console.error(e.stack))
});

router.post('/',(req,res)=>{
    const text = 'INSERT INTO SemesterClass(title) VALUES($1)'
    const values = [req.query.title]

    client.query(text,values)
    .then(() =>
        res.status(201).json({
            message: RESPONSE_CONST.HTTP_201
        })
    )
    .catch(e =>res.status(400).json({
        message: RESPONSE_CONST.HTTP_400
    })) 
});

module.exports=router;