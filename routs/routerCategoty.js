const express = require("express")
const { getAllCategories, createCategory } = require("../controller/controllerCategoty")
const categoryRout=express.Router()
const { createToken, auth } = require("../middlewares/authorization");


categoryRout.get('/', getAllCategories)
categoryRout.post('/', auth, createToken,createCategory)
module.exports = categoryRout