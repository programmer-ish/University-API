const express = require("express");
const {Client}=require('pg');

//DB connection
const client =new Client("postgres://ehhcmqsb:xcBCgsMlrcyqlUsU0mPL6aljm3B2UBxV@isilo.db.elephantsql.com:5432/ehhcmqsb");

client.connect()
.then(() => console.log("Connected to db successfully"))
.catch(e => console.log(e)) 


//API calls
const router = express.Router();

router.get("/", (req, res) => {
    client.query("select * from SemesterClass")
    .then(result => {return res.send(result.rows)})
    .catch(e =>console.error(e.stack))
});

router.post('/',(req,res)=>{
    const text = 'INSERT INTO SemesterClass(title) VALUES($1)'
    const values = [req.query.title]

    client.query(text,values)
    .then(() =>
        res.status(201).json({
            message: " HTTP status 201 Created"
        })
    )
    .catch(e =>res.status(400).json({
        message: " HTTP status 400 Bad Request"
    })) 
});

module.exports=router;