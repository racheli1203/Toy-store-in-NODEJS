// const toyModel = require('../models/toyModel');
// const Category = require('../models/modelCategory')


// async function getAllToys(req, res) {
//     try {
//         const allToys = await toyModel.find();
//         res.status(200).json(allToys)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

// async function getToyById(req, res) {
//     try {
//         const toy = await toyModel.findById(req.params.id)
//         res.status(200).json(toy)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

// // async function addToy(req, res) {
// //     try {
// //         const newToy = await toyModel.create(req.body)
// //         res.status(200).json(newToy)
// //     } catch (error) {
// //         res.status(400).send(error.message)
// //     }
// // }
// async function addToy(req, res) {
//     try {
//         const { name, prodDate, numberOfPlayers, ageOfPlayers, price, company, targets, categoryId } = req.body;

//         const newToy = new toyModel({
//             name,
//             prodDate,
//             numberOfPlayers,
//             ageOfPlayers,
//             price,
//             company,
//             targets,
//             categoryId
//         });

//         await newToy.save();

//         // Update the category to add the new toy
//         const category = await Category.findById(categoryId);
//         if (!category) {
//             return res.status(400).send('Category not found');
//         }
//         category.toys.push(newToy._id);
//         await category.save();

//         res.status(200).json(newToy);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// // async function deleteToy(req, res) {
// //     try {
// //         const deletedToy = await toyModel.findByIdAndDelete(req.params.id)
// //         res.status(200).json(deletedToy)
// //     } catch (error) {
// //         res.status(400).send(error.message)
// //     }
// // }
// async function deleteToy(req, res) {
//     try {
//         const toyId = req.params.id;
//         const deletedToy = await toyModel.findByIdAndDelete(toyId);
//         if (!deletedToy) {
//             return res.status(404).send('Toy not found');
//         }

//         // Update the category to remove the deleted toy
//         const category = await Category.findById(deletedToy.categoryId);
//         if (category) {
//             category.toys.pull(deletedToy._id);
//             await category.save();
//         }
//         res.status(200).json(deletedToy);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }


// async function deleteAllToys(req, res) {
//     try {
//         await toyModel.deleteMany()
//         res.status(200).send("All toys deleted")
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

// async function updateToy(req, res) {
//     try {
//         const updatedToy = await toyModel.findByIdAndUpdate(req.params.id, req.body,
//             { new: true })
//         res.status(200).json(updatedToy)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

// async function getToysByPrice(req, res) {
//     try {
//         const startPrice = req.body.startPrice
//         const endPrice = req.body.endPrice
//         const toys = await toyModel.find({
//             price: { $gte: startPrice, $lte: endPrice }
//         });
//         res.status(200).json(toys)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

// async function getToysbyName(req, res) {
//     try {
//         const searchText = req.params.text;
//         const regex = new RegExp(searchText, 'i');
//         const toys = await toyModel.find({ name: regex });
//         res.status(200).json(toys)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

// module.exports = { getAllToys, getToyById, addToy, deleteToy, deleteAllToys, updateToy, getToysByPrice, getToysbyName }

// // const toyDelete=await category.findById(req.params.id);
// // await toyModel.findByIdAndUpdate(toyDelete.toys)

const Toy = require('../models/toyModel');
const Category = require('../models/categoryModel');

async function getAllToys(req, res) {
    try {
        const allToys = await Toy.find();
        res.status(200).json(allToys);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getToyById(req, res) {
    try {
        const toy = await Toy.findById(req.params.id);
        res.status(200).json(toy);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function addToy(req, res) {
    try {
        const newToy = await Toy.create(req.body);
        const category = await Category.findById(req.body.categoryId);
        if (category) {
            category.toys.push(newToy._id);
            await category.save();
        }
        res.status(200).json(newToy);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function deleteToy(req, res) {
    try {
        const deletedToy = await Toy.findByIdAndDelete(req.params.id);
        if (deletedToy) {
            await Category.updateMany({}, { $pull: { toys: deletedToy._id } });
        }
        res.status(200).json(deletedToy);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function deleteAllToys(req, res) {
    try {
        await Toy.deleteMany();
        await Category.updateMany({}, { $set: { toys: [] } });
        res.status(200).send("All toys deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function updateToy(req, res) {
    try {
        const updatedToy = await Toy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedToy);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getToysByPrice(req, res) {
    try {
        const { startPrice, endPrice } = req.body;
        const toys = await Toy.find({ price: { $gte: startPrice, $lte: endPrice } });
        res.status(200).json(toys);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getToysbyName(req, res) {
    try {
        const searchText = req.params.text;
        const regex = new RegExp(searchText, 'i');
        const toys = await Toy.find({ name: regex });
        res.status(200).json(toys);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = { getAllToys, getToyById, addToy, deleteToy, deleteAllToys, updateToy, getToysByPrice, getToysbyName };
