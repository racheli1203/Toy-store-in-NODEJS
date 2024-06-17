require('dotenv').config();

const mongoose = require("mongoose");

//const uri = 'mongodb+srv://rachelwe939:r0504128647@maincluster.6ymwu9h.mongodb.net/toyStore';
//const uri = process.env.DB_CONNECT;

const localUri = "mongodb://localhost:27017/toyStore";

const connectDB = async() => {
    await mongoose.connect(process.env.DB_CONNECT)
}

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Database Connected');
})
module.exports=connectDB;