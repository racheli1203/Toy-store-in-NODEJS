const jwt = require('jsonwebtoken');

// פונקציה ליצירת טוקן
function createToken(req, res, next) {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET);
    req.token = token;
    next();
}

// פונקציה לאימות הטוקן
function auth(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = { createToken, auth };
