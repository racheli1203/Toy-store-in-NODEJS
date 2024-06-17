const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// פונקציה ליצירת משתמש חדש
async function createUser(req, res) {
    console.log(res.accessToken)
    console.log(req.body)
    try {
        console.log(res);
        const { name, email, password } = req.body;

        // בדיקת האם המשתמש קיים כבר לפי אימייל
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // הצפנת הסיסמא
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// פונקציה לבדוק שם משתמש וסיסמא
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // מציאת המשתמש לפי אימייל
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // בדיקת האם הסיסמא נכונה
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // יצירת טוקן JWT
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = { createUser, login };
