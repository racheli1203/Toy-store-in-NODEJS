// const Category = require('../models/modelCategory');
// const Toy = require('../models/toyModel');

// const getAllCategories = async (req, res) => {
//     try {
//         const categories = await Category.find().populate('toys');
//         res.json(categories);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// const createCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const category = new Category({ name });
//         await category.save();
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     getAllCategories,
//     createCategory
// };


const Category = require('../models/categoryModel');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('toys');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllCategories, createCategory };

