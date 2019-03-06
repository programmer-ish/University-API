const express = require("express");
const { Client } = require('pg');

const QUERY_CONST = require("./constants/dbQuery");
const RESPONSE_CONST = require("./constants/response");

//DB connection
const client = new Client("postgres://ehhcmqsb:xcBCgsMlrcyqlUsU0mPL6aljm3B2UBxV@isilo.db.elephantsql.com:5432/ehhcmqsb");

client.connect()
    .then(() => console.log("Connected to db successfully"))
    .catch(e => console.log(e))


//API calls
const router = express.Router();

router.get("/", (req, res) => {
    client.query(QUERY_CONST.GET_PROFESSORS)
        .then(result => { return res.send(result.rows) })
        .catch(e => {
            console.error(e.stack);
            res.status(400).send({
                message: RESPONSE_CONST.HTTP_400,
                error: e.stack
            });
        })
});

router.post('/', (req, res) => {
    const query = QUERY_CONST.POST_PROFESSOR
    const values = [req.query.name, req.query.designation]

    client.query(query, values)
        .then(() =>
            res.status(201).json({
                message: RESPONSE_CONST.HTTP_201
            })
        )
        .catch(e => {
            console.error(e.stack);
            res.status(400).send({
                message: RESPONSE_CONST.HTTP_400,
                error: e.stack
            });
        })
});

module.exports = router;