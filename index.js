const express=require("express");
const app=express();

const studentRouter=require("./app/studentRouter");

const port=4000;

app.use(bodyParser.urlencoded({   extended: true })); 
app.use(bodyParser.json());

app.use("/student",studentRouter); //middleware student

const server=app.listen(port,()=>{
    console.log("Server is running");
});


