require('dotenv').config();  // הוסף שורה זו בהתחלת הקובץ

const express = require("express");
const app = express();
//const dotenv=require('dotenv');
const bodyParser = require("body-parser")
const port = 8080;
const connectDb = require('./models/connectDB')
const toyRouter = require("./routs/toyRouts");
const categoryRout = require("./routs/routerCategoty");
const userRouter=require("./routs/userRouts");
const cors =require('cors');

//גישה לשרת מפורט שונה
app.use(cors());

app.use(bodyParser.json());

app.use('/toys', toyRouter);

app.use('/category',categoryRout)

app.use('/users', userRouter); 

connectDb();

app.listen(port, () => {
    console.log("server is running :)")
})