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
    const query = QUERY_CONST.POST_CLASS
    const values = [req.query.title]

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

router.post("/:id/students", (req, res)=> {
    const id=req.params.id;
    const query = QUERY_CONST.POST_STUDENTS_TO_CLASS
    let value = '';
    for(var val of req.body.students){
        value += '('+id+','+val+'),'
    }
    value=value.substring(0,value.length-1);
    value=query+value+';';
    client.query(value)
    .then(() =>
        res.status(201).json({
            message: RESPONSE_CONST.HTTP_201
        })
    )
    .catch(e =>res.status(400).json({
        message: RESPONSE_CONST.HTTP_400
    })) 

});

router.post("/:id/professor", (req, res)=> {
    const query = QUERY_CONST.POST_PROFESSOR_TO_CLASS
    const values = [req.params.id,req.query.professor]
    client.query(query,values)
    .then(() =>res.status(201).json({
            message: RESPONSE_CONST.HTTP_201
        })
    )
    .catch(e =>res.status(400).json({
        message: RESPONSE_CONST.HTTP_400
    })) 

});
module.exports=router;