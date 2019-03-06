const bodyParser=require("body-parser");
const express=require("express");

const db=require("./app/database");
const classesRouter=require("./app/classesRouter");
const studentRouter=require("./app/studentRouter");
const professorRouter=require("./app/professorRouter");

//Server setup
const app=express();
const port=4000;
db();

app.use(bodyParser.urlencoded({   extended: true })); 
app.use(bodyParser.json());

app.use("/classes",classesRouter);
app.use("/students",studentRouter);
app.use("/professor",studentRouter);  

const server=app.listen(port,()=>{
    console.log("Server is running");
});


