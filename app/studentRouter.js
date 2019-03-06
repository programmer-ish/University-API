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

router.get("/", (req, res)=> {
    client.query(QUERY_CONST.GET_STUDENTS)
    .then(result => {return res.send(result.rows)})
    .catch(e =>console.error(e.stack))
});

router.get("/:id", (req, res)=> {
    client.query(QUERY_CONST.GET_STUDENT_BY_ID+req.params.id)
    .then(result => {return res.send(result.rows)})
    .catch(e =>console.error(e.stack))
});

router.get("/:id/classes", (req, res)=> {
    client.query(QUERY_CONST.GET_CLASSES_OF_STUDENT+req.params.id)
    .then(result => {return res.send(result.rows)})
    .catch(e =>console.error(e.stack))
});

router.post('/',(req,res)=>{
    const query = QUERY_CONST.POST_STUDENTS
    const values = [req.body.name,req.body.admissionDate]

   client.query(query,values)
   .then(() =>
       res.status(201).json({
           message: RESPONSE_CONST.HTTP_201
       })
   )
   .catch(e =>res.status(400).json({
       message: RESPONSE_CONST.HTTP_400
   })) 
});

router.patch("/:id",(req,res)=>{
    const query = QUERY_CONST.PATCH_STUDENTS
    const values = [req.query.name,req.params.id]

   client.query(query,values)
   .then(() =>res.status(200))
   .catch(e =>res.status(400)) 
});

router.delete("/:id",(req,res)=>{
    const query = QUERY_CONST.DELETE_STUDENTS+req.params.id
    client.query(query)
   .then(() =>res.status(200))
   .catch(e =>res.status(400)) 
});


module.exports=router;