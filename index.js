const bodyParser=require("body-parser");
const express=require("express");

const db=require("./app/database");
const classesRouter=require("./app/classesRouter");
const studentRouter=require("./app/studentRouter");

//Server setup
const app=express();
const port=4000;
db();

app.use(bodyParser.urlencoded({   extended: true })); 
app.use(bodyParser.json());

app.use("/classes",classesRouter); //middleware student
app.use("/students",studentRouter); //middleware student

const server=app.listen(port,()=>{
    console.log("Server is running");
});


