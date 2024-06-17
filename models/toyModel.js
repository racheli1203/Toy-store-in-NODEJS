// const mongoose = require("mongoose");

// const toySchema = mongoose.Schema({
//     name:
//     {
//         type: String, require: true, minLength: 3
//     },
//     prodDate:
//     {
//         type: Date, default: new Date().getDate()
//     },
//     numberOfPlayers:
//     {
//         type: Number, require: true, min: 1
//     },
//     ageOfPlayers:
//     {
//         type: String, require: true
//     },
//     price:
//     {
//         type: Number, require: true
//     },
//     company:
//     {
//         type: String, require: true, match: /^(?=.*[a-zA-Z].*[a-zA-Z])[\w\d]+$/
//     },
//     targets: {type: [String], require: true},
//     categoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     }

// });

// module.exports = mongoose.model('toy', toySchema);

const mongoose = require("mongoose");

const toySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minLength: 3
    },
    prodDate: {
        type: Date, 
        default: Date.now
    },
    numberOfPlayers: {
        type: Number, 
        required: true, 
        min: 1
    },
    ageOfPlayers: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    company: {
        type: String, 
        required: true, 
        match: /^(?=.*[a-zA-Z].*[a-zA-Z])[\w\d]+$/
    },
    targets: {
        type: [String], 
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = mongoose.model('Toy', toySchema);
