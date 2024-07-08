const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/userRoutes")
const dbconnect = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/TRAVEL");
        console.log("db connect");
    }
    //mongodb://localhost:27017/
    catch(error){
        console.log(error);
        console.log("error in db connection");
    }
}

app.use(express.json()); //helps me to convert the request into json format
app.use(cors());

app.get("/",(req,res) => {
    res.send("Hello World")
    res.end();
})
app.use("/users", router);
app.use("/flight",router);
app.use("/hotel",router);
app.use("/tour",router);

app.listen(4000,() => {
    dbconnect();
    console.log("Server is running on port 4000")
})