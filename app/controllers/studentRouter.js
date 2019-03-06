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
    const pageSize = req.query.pageSize || 20;
    const pageNo = req.query.pageNo || 1;

    let queryString = "";
    let alreadyAdded = false;

    if (req.query.classes) {
        queryString = "select DISTINCT * from Student inner join ClassStudent on Student.roll_no=ClassStudent.studentId where "
        queryString += "ClassStudent.classId in (" + req.query.classes.join(',') + ") "
        alreadyAdded = true;
    } else {
        queryString = "select * from Student where ";
    }

    if (req.query.admissionYearAfter) {
        queryString += (alreadyAdded == true ? "AND EXTRACT(YEAR FROM Student.admissionDate) >= " + req.query.admissionYearAfter : "EXTRACT(YEAR FROM Student.admissionDate) >= " + req.query.admissionYearAfter)
        alreadyAdded = true;
    }

    if (req.query.admissionYearBefore) {
        queryString += (alreadyAdded == true ? " AND EXTRACT(YEAR FROM Student.admissionDate) <= " + req.query.admissionYearBefore : " EXTRACT(YEAR FROM Student.admissionDate) <= " + req.query.admissionYearBefore)
        alreadyAdded = true;
    }

    if (req.query.active) {
        queryString += (alreadyAdded == true ? " AND Student.active = " + req.query.active : " Student.active= " + req.query.active)
        alreadyAdded = true;
    }

    if (alreadyAdded == false) {
        queryString = QUERY_CONST.GET_STUDENTS
    }

    queryString += " LIMIT " + pageSize + " OFFSET " + ((pageNo - 1) * pageSize) + ";";

    client.query(queryString)
        .then(result => { return res.send(result.rows) })
        .catch(e => {
            console.error(e.stack);
            res.status(400).send({
                message: RESPONSE_CONST.HTTP_400,
                error: e.stack
            });
        })
});


router.get("/:id", (req, res) => {
    client.query(QUERY_CONST.GET_STUDENT_BY_ID + req.params.id)
        .then(result => { return res.send(result.rows) })
        .catch(e => {
            console.error(e.stack);
            res.status(400).send({
                message: RESPONSE_CONST.HTTP_400,
                error: e.stack
            });
        })
});

router.get("/:id/classes", (req, res) => {
    client.query(QUERY_CONST.GET_CLASSES_OF_STUDENT + req.params.id)
        .then(result => {
            (result.rowCount != 0 ? res.send(result.rows) : res.status(404).json({
                message: RESPONSE_CONST.HTTP_404
            }))
        })
        .catch(e => {
            console.error(e.stack);
            res.status(400).send({
                message: RESPONSE_CONST.HTTP_400,
                error: e.stack
            });
        })
});

router.post('/', (req, res) => {
    const query = QUERY_CONST.POST_STUDENT
    const values = [req.body.name, req.body.admissionDate]

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

router.patch("/:id", (req, res) => {
    const query = QUERY_CONST.PATCH_STUDENT
    const values = [req.query.name, req.params.id]

    client.query(query, values)
        .then(() => res.status(200))
        .catch(e => {
            console.error(e.stack);
            res.status(400).send({
                message: RESPONSE_CONST.HTTP_400,
                error: e.stack
            });
        })
});

router.delete("/:id", (req, res) => {
    const query = QUERY_CONST.DELETE_STUDENT + req.params.id
    client.query(query)
        .then(() => res.status(200))
        .catch(e => {
            console.error(e.stack);
            res.status(400).send({
                message: RESPONSE_CONST.HTTP_400,
                error: e.stack
            });
        })
});

module.exports = router;