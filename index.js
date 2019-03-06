const bodyParser = require("body-parser");
const express = require("express");

const db = require("./app/database");
const classesRouter = require("./app/controllers/classes");
const studentRouter = require("./app/controllers/student");
const professorRouter = require("./app/controllers/professor");

//Server setup
const app = express();
const port = 4000;

// For initialising db schema 
db(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/classes", classesRouter);
app.use("/students", studentRouter);
app.use("/professor", professorRouter);

const server = app.listen(port, () => {
    console.log("Server is running");
});