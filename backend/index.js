const express = require("express");
const connection = require("./db");
const {taskRouter} = require("./routes/task.routes")
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.json("Working Fine");
})
app.use("/task", taskRouter);

app.listen("2002",async(req,res)=>{
    try{
     await connection;
     console.log("Connected to DB");
     console.log("Server is running on port 2002");
    }
    catch(err){
     console.log(err);
    }
 })