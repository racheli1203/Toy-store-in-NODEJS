const express = require("express")
const { getAllToys, getToyById, getToysByPrice, getToysbyName, addToy, updateToy, deleteToy, deleteAllToys } = require("../controller/toyController")
const { createToken, auth } = require("../middlewares/authorization");
const toyRout = express.Router()


toyRout.get('/', getAllToys)
toyRout.get('/getAllToys', getAllToys)
toyRout.get('/getToyById/:id', getToyById)
toyRout.get('/getToysByPrice', getToysByPrice)
toyRout.get('/getToysByName/:text', getToysbyName)
toyRout.post('/', createToken, addToy)
toyRout.put('/:id', createToken, updateToy)
toyRout.delete('/:id', createToken, deleteToy)
toyRout.delete('/', createToken,deleteAllToys)

module.exports = toyRout