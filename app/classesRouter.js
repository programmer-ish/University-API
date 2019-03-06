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

module.exports=router;