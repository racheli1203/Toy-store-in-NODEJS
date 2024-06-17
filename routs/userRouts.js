const express = require('express');
//const { createUser, login } = require('../controller/userController');
const {createUser,login}=require('../controller/userController ');
const {  auth } = require("../middlewares/authorization");
const userRouter = express.Router();

userRouter.post('/register',auth, createUser);
userRouter.post('/login', auth, login);

module.exports = userRouter;
 