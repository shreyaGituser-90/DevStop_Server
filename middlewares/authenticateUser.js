const jwt = require("jsonwebtoken");
const verifytoken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {...decoded,...req.body};
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

module.exports = {verifytoken};